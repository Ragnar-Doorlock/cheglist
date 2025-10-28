import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { RunRepository } from "../run.repository";
import { ChecklistRepository } from "src/checklist/checklist.repository";
import { ProjectRepository } from "src/project/project.repository";
import { CreateRunDto } from "../dto/create-run.dto";
import { CreateRunResponseData } from "../response-types/create-run.type";
import { Run } from "src/entities/run/run";
import { runStatus } from "../runStatus";
import { CreateRunResponseBuilder } from "./create-run.response-builder";
import { RunItem } from "src/entities/run-item-result/run-item";
import { runItemStatus } from "src/run-item/runItemStatus";

@Injectable()
export class CreateRunInteractor {
    constructor(
        private runRepository: RunRepository,
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
        private responseBuilder: CreateRunResponseBuilder,
    ) {}

    async execute(
        createRunDto: CreateRunDto,
        requestUserId: string,
    ): Promise<CreateRunResponseData> {
        const checklist = await this.checklistRepository.findById(createRunDto.checklistId);
        if (!checklist) {
            throw new NotFoundException('Checklist was not found');
        }
        const project = await this.projectRepository.findById(checklist.projectId);
        if (!project) {
            throw new Error('Project was not found');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission interact with this checklist');
        }

        const lastRun = await this.runRepository.findLastByChecklistId(createRunDto.checklistId);
        const nextOrder = lastRun ? lastRun.order + 1 : 1;

        const runItems = (checklist.items ?? []).map((item) =>
            RunItem.create({
                checklistItemId: item.id,
                order: item.order,
                title: item.title,
                tag: item.tag,
                status: runItemStatus.NOT_RUN,
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
        );

        const run = Run.create({
            checklistId: checklist.id,
            tester: createRunDto.tester,
            build: createRunDto.build,
            order: nextOrder,
            status: runStatus.IN_PROGRESS,
            startedAt: new Date(),
            runItems: runItems.map((i) => i.toData()),
        });

        await this.runRepository.save(run);
        return this.responseBuilder.build(run);
    }
}