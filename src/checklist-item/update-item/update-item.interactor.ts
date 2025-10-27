import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateItemResponseBuilder } from "./update-item.response-builder";
import { ChecklistRepository } from "../../checklist/checklist.repository";
import { ProjectRepository } from "src/project/project.repository";
import { UpdateChecklistItemDto } from "../dto/update-checklist-item.dto";
import { UpdateItemResponseData } from "../response-types/update-item.type";
import { ChecklistItem } from "src/entities/checklist-item/checklist-item";
import { Checklist } from "src/entities/checklist/checklist";

@Injectable()
export class UpdateItemInteractor {
    constructor (
        private responseBuilder: UpdateItemResponseBuilder,
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
    ) {}

    async execute(
        checklistId: string,
        itemId: string,
        dto: UpdateChecklistItemDto,
        requestUserId: string,
    ): Promise<UpdateItemResponseData> {
        const checklist = await this.checklistRepository.findById(checklistId);
        if (!checklist) {
            throw new NotFoundException('Checklist was not found');
        }
        const project = await this.projectRepository.findById(checklist.projectId);
        if (!project) {
            throw new Error('Project was not found');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to modify this checklist');
        }
        
        const items = checklist.items ?? [];
        const itemIndex = items.findIndex(i => i.id === itemId);
        if (itemIndex === -1) {
            throw new NotFoundException(`Checklist item with id ${itemId} not found`);
        }

        const oldItem = items[itemIndex];

        if (dto.order === undefined || dto.order === oldItem.order) {
            const updatedItem = ChecklistItem.create({
                ...oldItem,
                title: dto.title ?? oldItem.title,
                tag: dto.tag ?? oldItem.tag,
                updatedAt: new Date(),
            });

            const updatedItems = [...items];
            updatedItems[itemIndex] = updatedItem.toData();

            const updatedChecklist = Checklist.create({
                ...checklist,
                items: updatedItems,
            });

            await this.checklistRepository.save(updatedChecklist);
            const updatedChecklistFromDb = await this.checklistRepository.findById(checklistId);
            if (!updatedChecklistFromDb) throw new Error('Updated checklist not found');

            return this.responseBuilder.build(updatedChecklistFromDb);
        }

        const targetOrder = Math.max(1, Math.min(dto.order, items.length));
        const movingItem = ChecklistItem.create({
            ...oldItem,
            title: dto.title ?? oldItem.title,
            order: targetOrder,
            updatedAt: new Date(),
        }).toData();

        const remainingItems = items.filter(i => i.id !== itemId);

        const reordered = [
            ...remainingItems.slice(0, targetOrder - 1),
            movingItem,
            ...remainingItems.slice(targetOrder - 1),
        ];
        // TODO reorder runItems too. Only for IN_PROGRESS??? -> i think like not only?
        const normalizedItems = reordered.map((item, index) => ({
            ...item,
            order: index + 1,
        }));

        const updatedChecklist = Checklist.create({
            ...checklist,
            items: normalizedItems,
        });

        await this.checklistRepository.save(updatedChecklist);
        const updatedChecklistFromDb = await this.checklistRepository.findById(checklistId);
        if (!updatedChecklistFromDb) {
            throw new Error('Updated checklist not found');
        }
        return this.responseBuilder.build(updatedChecklistFromDb);
    }
}
