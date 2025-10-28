import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateItemResponseBuilder } from "./update-item.response-builder";
import { ChecklistRepository } from "../../checklist/checklist.repository";
import { ProjectRepository } from "src/project/project.repository";
import { RunRepository } from "src/run/run.repository";
import { UpdateChecklistItemDto } from "../dto/update-checklist-item.dto";
import { UpdateItemResponseData } from "../response-types/update-item.type";
import { ChecklistItem } from "src/entities/checklist-item/checklist-item";
import { Checklist } from "src/entities/checklist/checklist";
import { Run } from "src/entities/run/run";
import { RunItem } from "src/entities/run-item-result/run-item";

@Injectable()
export class UpdateItemInteractor {
    constructor(
        private responseBuilder: UpdateItemResponseBuilder,
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
        private runRepository: RunRepository,
    ) {}

    async execute(
        checklistId: string,
        itemId: string,
        dto: UpdateChecklistItemDto,
        requestUserId: string,
    ): Promise<UpdateItemResponseData> {
        const checklist = await this.checklistRepository.findById(checklistId);
        if (!checklist) throw new NotFoundException('Checklist was not found');

        const project = await this.projectRepository.findById(checklist.projectId);
        if (!project) throw new NotFoundException('Project was not found');
        if (project.ownerId !== requestUserId)
            throw new ForbiddenException('You do not have permission to modify this checklist');

        const items = checklist.items ?? [];
        const itemIndex = items.findIndex(i => i.id === itemId);
        if (itemIndex === -1)
            throw new NotFoundException(`Checklist item with id ${itemId} not found`);

        const oldItem = items[itemIndex];

        const targetOrder = dto.order ?? oldItem.order;
        const updatedItem = ChecklistItem.create({
            ...oldItem,
            title: dto.title ?? oldItem.title,
            tag: dto.tag ?? oldItem.tag,
            order: targetOrder,
            updatedAt: new Date(),
        });

        const remainingItems = items.filter(i => i.id !== itemId);
        const reordered = [
            ...remainingItems.slice(0, targetOrder - 1),
            updatedItem.toData(),
            ...remainingItems.slice(targetOrder - 1),
        ];

        const normalizedItems = reordered.map((item, index) => ({
            ...item,
            order: index + 1,
        }));

        const updatedChecklist = Checklist.create({
            ...checklist,
            items: normalizedItems,
        });

        await this.checklistRepository.save(updatedChecklist);

        const runs = await this.runRepository.findByChecklistId(checklistId);

        for (const run of runs) {
            const updatedRunItems = normalizedItems.map((checklistItem) => {
                const existing = run.runItems.find(
                    (r) => r.checklistItemId === checklistItem.id,
                );

                if (existing) {
                    return {
                        ...existing,
                        title: checklistItem.title,
                        tag: checklistItem.tag,
                        order: checklistItem.order,
                        updatedAt: new Date(),
                    };
                }

                return RunItem.create({
                    checklistItemId: checklistItem.id,
                    title: checklistItem.title,
                    tag: checklistItem.tag,
                    order: checklistItem.order,
                    status: 'not_run',
                    comment: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }).toData();
            });

            const filteredRunItems = updatedRunItems.filter((runItem) =>
                normalizedItems.some(i => i.id === runItem.checklistItemId)
            );

            const sortedRunItems = filteredRunItems.sort((a, b) => a.order - b.order);

            const updatedRun = Run.create({
                ...run,
                runItems: sortedRunItems,
                updatedAt: new Date(),
            });

            await this.runRepository.save(updatedRun);
        }

        const updatedChecklistFromDb = await this.checklistRepository.findById(checklistId);
        if (!updatedChecklistFromDb)
            throw new Error('Updated checklist not found');

        return this.responseBuilder.build(updatedChecklistFromDb);
    }
}
