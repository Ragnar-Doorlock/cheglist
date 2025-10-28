import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { RunRepository } from "../run.repository";
import { ChecklistRepository } from "src/checklist/checklist.repository";
import { ProjectRepository } from "src/project/project.repository";

@Injectable()
export class DeleteRunInteractor {
    constructor(
        private runRepository: RunRepository,
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
    ) {}

    async execute(runId: string, requestUserId: string): Promise<void> {
        const run = await this.runRepository.findById(runId);
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
            throw new ForbiddenException('You do not have permission to delete this run');
        }

        await this.runRepository.deleteById(runId);
    }
}
