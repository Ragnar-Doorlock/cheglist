import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ChecklistRepository } from "../../checklist/checklist.repository";
import { ProjectRepository } from "src/project/project.repository";
import { AddItemResponseBuilder } from "./add-item.response-builder";
import { CreateChecklistItemDto } from "../dto/create-checklist-item.dto";
import { ChecklistItem } from "src/entities/checklist-item/checklist-item";
import { Checklist } from "src/entities/checklist/checklist";
import { AddItemResponseData } from "../response-types/add-item.type";

@Injectable()
export class AddItemInteractor {
    constructor(
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
        private responseBuilder: AddItemResponseBuilder,
    ) {}

    async execute(
        id: string,
        createChecklistItemDto: CreateChecklistItemDto,
        requestUserId: string,
    ): Promise<AddItemResponseData> {
        const checklist = await this.checklistRepository.findById(id);
        if (!checklist) {
            throw new NotFoundException('Checklist was not found');
        }
        const project = await this.projectRepository.findById(checklist.projectId);
        if (!project) {
            throw new Error('Project was not found.');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to modify this checklist');
        }

        const newItem = ChecklistItem.create({
            title: createChecklistItemDto.title,
            // TODO increment all other if inserted already added order???? <<<<<<<<<<<<<<<<<<<<<<
            order: createChecklistItemDto.order ?? (checklist.items?.length ?? 0) + 1,
        });
        const updatedItems = [...(checklist.items ?? []), newItem.toData()];

        const updatedChecklist = Checklist.create({
            ...checklist,
            items: updatedItems,
        });

        await this.checklistRepository.save(updatedChecklist);
        const updatedChecklistFromDb = await this.checklistRepository.findById(id);
        if (!updatedChecklistFromDb) {
            throw new Error('Updated checklist was not found.');
        }
        return this.responseBuilder.build(updatedChecklistFromDb);
    }
}
