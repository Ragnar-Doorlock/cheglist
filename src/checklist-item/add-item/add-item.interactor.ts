import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { AddItemResponseBuilder } from "./add-item.response-builder";
import { ChecklistRepository } from "../../checklist/checklist.repository";
import { ProjectRepository } from "src/project/project.repository";
import { RunRepository } from "src/run/run.repository";
import { CreateChecklistItemDto } from "../dto/create-checklist-item.dto";
import { AddItemResponseData } from "../response-types/add-item.type";
import { ChecklistItem } from "src/entities/checklist-item/checklist-item";
import { Checklist } from "src/entities/checklist/checklist";
import { Run } from "src/entities/run/run";
import { RunItem } from "src/entities/run-item-result/run-item";

@Injectable()
export class AddItemInteractor {
    constructor(
        private responseBuilder: AddItemResponseBuilder,
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
        private runRepository: RunRepository,
    ) {}

    async execute(
        checklistId: string,
        dto: CreateChecklistItemDto,
        requestUserId: string,
    ): Promise<AddItemResponseData> {
        const checklist = await this.checklistRepository.findById(checklistId);
        if (!checklist) throw new NotFoundException('Checklist was not found');

        const project = await this.projectRepository.findById(checklist.projectId);
        if (!project) throw new NotFoundException('Project was not found');
        if (project.ownerId !== requestUserId)
            throw new ForbiddenException('You do not have permission to modify this checklist');

        const items = checklist.items ?? [];

        const targetOrder = dto.order
            ? Math.max(1, Math.min(dto.order, items.length + 1))
            : items.length + 1;

        const newItem = ChecklistItem.create({
            title: dto.title,
            tag: dto.tag,
            order: targetOrder,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const reordered = [
            ...items.slice(0, targetOrder - 1),
            newItem.toData(),
            ...items.slice(targetOrder - 1),
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
            const runItems = run.runItems ?? [];

            const newRunItem = RunItem.create({
                checklistItemId: newItem.getId(),
                title: newItem.getTitle(),
                tag: newItem.getTag(),
                order: targetOrder,
                status: 'not_run',
                comment: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            }).toData();

            const updatedRunItems = [
                ...runItems.slice(0, targetOrder - 1),
                newRunItem,
                ...runItems.slice(targetOrder - 1),
            ].map((item, index) => ({
                ...item,
                order: index + 1,
            }));

            const updatedRun = Run.create({
                ...run,
                runItems: updatedRunItems,
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
