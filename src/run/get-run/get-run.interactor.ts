import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { RunRepository } from "../run.repository";
import { ProjectRepository } from "src/project/project.repository";
import { ChecklistRepository } from "src/checklist/checklist.repository";
import { GetRunResponseBuilder } from "./get-run.response-builder";
import { GetRunResponseData } from "../response-types/get-run.type";

@Injectable()
export class GetRunInteractor {
    constructor(
        private runRepository: RunRepository,
        private projectRepository: ProjectRepository,
        private checklistRepository: ChecklistRepository,
        private responseBuilder: GetRunResponseBuilder,
    ) {}

    async execute(id: string, requestUserId: string): Promise<GetRunResponseData | null> {
        const run = await this.runRepository.findById(id);
        if (!run) {
            throw new NotFoundException('Run was not found');
        }
        const checklist = await this.checklistRepository.findById(run.checklistId);
        if (!checklist) {
            throw new Error('checklist was not found');
        }
        const project = await this.projectRepository.findById(checklist.projectId);
        if (!project) {
            throw new Error('Project was not found');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to view this run');
        }

        return this.responseBuilder.build(run);
    }
}
