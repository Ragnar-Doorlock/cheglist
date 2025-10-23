import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { RunRepository } from "../run.repository";
import { ChecklistRepository } from "src/checklist/checklist.repository";
import { ProjectRepository } from "src/project/project.repository";
import { CreateRunDto } from "../dto/create-run.dto";
import { CreateRunResponseData } from "../response-types/create-run.type";
import { Run } from "src/entities/run/run";
import { runStatus } from "../runStatus";
import { CreateRunResponseBuilder } from "./create-run.response-builder";

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

        const run = Run.create({
            checklistId: createRunDto.checklistId,
            tester: createRunDto.tester,
            build: createRunDto.build,
            status: runStatus.IN_PROGRESS,
            runItems: [],
            startedAt: new Date(),
        });
        await this.runRepository.save(run);
        return this.responseBuilder.build(run);
    }
}