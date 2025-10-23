import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { RunRepository } from "../run.repository";
import { ChecklistRepository } from "src/checklist/checklist.repository";
import { ProjectRepository } from "src/project/project.repository";
import { SearchRunsResponseBuilder } from "./search-runs.response-builder";
import { SearchRunsResponseData } from "../response-types/search-runs.type";

@Injectable()
export class SearchRunsInteractor {
    constructor(
        private runRepository: RunRepository,
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
        private responseBuilder: SearchRunsResponseBuilder,
    ) {}

    async execute(
        checklistId: string,
        requestUserId: string,
    ): Promise<SearchRunsResponseData[] | []> {
        const checklist = await this.checklistRepository.findById(checklistId);
        if (!checklist) {
            throw new NotFoundException('Checklist does not exist');
        }
        const project = await this.projectRepository.findById(checklist.projectId);
        if (!project) {
            throw new Error('Project was not found');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to view this project');
        }

        const runs = await this.runRepository.findByChecklistId(checklistId);
        return this.responseBuilder.build(runs);
    }
}
