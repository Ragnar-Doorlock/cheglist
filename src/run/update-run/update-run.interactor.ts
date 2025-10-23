import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateRunResponseBuilder } from "./update-run.response-builder";
import { RunRepository } from "../run.repository";
import { ChecklistRepository } from "src/checklist/checklist.repository";
import { ProjectRepository } from "src/project/project.repository";
import { UpdateRunResponseData } from "../response-types/update-run.type";
import { UpdateRunDto } from "../dto/update-run.dto";
import { Run } from "src/entities/run/run";

@Injectable()
export class UpdateRunInteractor {
    constructor(
        private responseBuilder: UpdateRunResponseBuilder,
        private runRepository: RunRepository,
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
    ) {}

    async execute(
        id: string,
        dto: UpdateRunDto,
        requestUserId: string,
    ): Promise<UpdateRunResponseData> {
        const run = await this.runRepository.findById(id);
        if (!run) {
            throw new NotFoundException('Run was not found');
        }
        const checklist = await this.checklistRepository.findById(run.checklistId);
        if (!checklist) {
            throw new Error('Checklist was not found');
        }
        const project = await this.projectRepository.findById(checklist.projectId);
        if (!project) {
            throw new Error('Project was not found');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to modify that run');
        }

        const updatedRun = Run.create({
            ...run,
            tester: dto.tester ?? run.tester,
            build: dto.build ?? run.build,
            status: dto.status ?? run.status,
        });

        await this.runRepository.save(updatedRun);
        const updatedRunFromDb = await this.runRepository.findById(id);
        if (!updatedRunFromDb) {
            throw new NotFoundException('Updated run not found');
        }
        if(!updatedRunFromDb.id) {
            throw new Error('Updated run ID is missing');
        }

        return this.responseBuilder.build(updatedRunFromDb);
    }
}
