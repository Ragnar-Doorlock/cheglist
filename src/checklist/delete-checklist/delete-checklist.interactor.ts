import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ChecklistRepository } from "../checklist.repository";
import { RunRepository } from "src/run/run.repository";
import { ProjectRepository } from "src/project/project.repository";

@Injectable()
export class DeleteChecklistInteractor {
    constructor(
        private checklistRepository: ChecklistRepository,
        private runRepository: RunRepository,
        private projectRepository: ProjectRepository,
    ) {}

    async execute(checklistId: string, requestUserId: string) {
        const checklist = await this.checklistRepository.findById(checklistId);
        if (!checklist) {
            throw new NotFoundException('Checklist was not found');
        }
        const project = await this.projectRepository.findById(checklist.projectId);
        if (!project) {
            throw new Error('Project was not found');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to delete this checklist');
        }

        await Promise.all([
            this.runRepository.deleteManyByChecklistIds([checklistId]),
            this.checklistRepository.deleteById(checklistId),
        ]);
    }
}
