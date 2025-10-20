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
            throw new Error('Prject was not found');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to modify this checklist');
        }

        const itemIndex = checklist.items?.findIndex(i => i.id === itemId);
        if (itemIndex === undefined || itemIndex === -1) {
            throw new NotFoundException(`Checklist item with id ${itemId} not found`);
        }

        if (!checklist.items) {
            throw new Error('Checklist items are missing');
        }
        const oldItem = checklist.items[itemIndex];
        const updatedItem = ChecklistItem.create({
            id: oldItem.id,
            title: dto.title ?? oldItem.title,
            order: dto.order ?? oldItem.order,
            createdAt: oldItem.createdAt,
            updatedAt: new Date(),
        });

        const updatedItems = [...(checklist.items ?? [])];
        updatedItems[itemIndex] = updatedItem.toData();

        const updatedChecklist = Checklist.create({
            ...checklist,
            items: updatedItems,
        });
        await this.checklistRepository.save(updatedChecklist);

        const updatedChecklistFromDb = await this.checklistRepository.findById(checklistId);
        if (!updatedChecklistFromDb) {
            throw new Error('Updated checklist not found');
        }

        return this.responseBuilder.build(updatedChecklistFromDb);
    }
}
