import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ChecklistRepository } from "../../checklist/checklist.repository";
import { ProjectRepository } from "src/project/project.repository";
import { RunRepository } from "src/run/run.repository";
import { Checklist } from "src/entities/checklist/checklist";
import { Run } from "src/entities/run/run";
import { DeleteItemResponseData } from "../response-types/delete-item.type";
import { DeleteItemResponseBuilder } from "./delete-item.response-builder";

@Injectable()
export class DeleteItemInteractor {
    constructor(
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
        private runRepository: RunRepository,
        private responseBuilder: DeleteItemResponseBuilder,
    ) {}

    async execute(
        checklistId: string,
        itemId: string,
        requestUserId: string,
    ): Promise<DeleteItemResponseData> {
        const checklist = await this.checklistRepository.findById(checklistId);
        if (!checklist) throw new NotFoundException('Checklist was not found');

        const project = await this.projectRepository.findById(checklist.projectId);
        if (!project) throw new NotFoundException('Project was not found');
        if (project.ownerId !== requestUserId)
            throw new ForbiddenException('You do not have permission to modify this checklist');

        const items = checklist.items ?? [];
        const targetItem = items.find(i => i.id === itemId);
        if (!targetItem) throw new NotFoundException(`Checklist item ${itemId} not found`);

        const remainingItems = items
            .filter(i => i.id !== itemId)
            .map((item, index) => ({
                ...item,
                order: index + 1,
            }));

        const updatedChecklist = Checklist.create({
            ...checklist,
            items: remainingItems,
            updatedAt: new Date(),
        });

        await this.checklistRepository.save(updatedChecklist);

        const runs = await this.runRepository.findByChecklistId(checklistId);
        for (const run of runs) {
            const runItems = run.runItems ?? [];

            const filteredRunItems = runItems
                .filter(r => r.checklistItemId !== itemId)
                .map((item, index) => ({
                    ...item,
                    order: index + 1,
                }));

            const updatedRun = Run.create({
                ...run,
                runItems: filteredRunItems,
                updatedAt: new Date(),
            });

            await this.runRepository.save(updatedRun);
        }

        const updatedChecklistFromDb = await this.checklistRepository.findById(checklistId);
        if (!updatedChecklistFromDb) {
            throw new Error('Updated checklist not found');
        }
        return this.responseBuilder.build(updatedChecklistFromDb);
    }
}
