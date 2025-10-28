import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectRepository } from "../project.repository";
import { ChecklistRepository } from "src/checklist/checklist.repository";
import { RunRepository } from "src/run/run.repository";

@Injectable()
export class DeleteProjectInteractor {
    constructor(
        private projectRepository: ProjectRepository,
        private checklistRepository: ChecklistRepository,
        private runRepository: RunRepository,
    ) {}

    async execute(projectId: string, requestUserId: string) {
        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            throw new NotFoundException('Project was not found');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to delete that project');
        }

        const checklistIds = await this.checklistRepository.findIdsByProjectId(projectId);

        await Promise.all([
            this.runRepository.deleteManyByChecklistIds(checklistIds),
            this.checklistRepository.deleteManyByProjectId(projectId),
            this.projectRepository.deleteById(projectId),
        ]);
    }
}
