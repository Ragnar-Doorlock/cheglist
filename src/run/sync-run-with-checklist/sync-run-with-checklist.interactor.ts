import { Injectable, NotFoundException } from "@nestjs/common";
import { RunItem } from "src/entities/run-item-result/run-item";
import { ChecklistRepository } from "../../checklist/checklist.repository";
import { RunRepository } from "src/run/run.repository";
import { Run } from "src/entities/run/run";

@Injectable()
export class SyncRunWithChecklistInteractor {
    constructor(
        private runRepository: RunRepository,
        private checklistRepository: ChecklistRepository,
    ) {}

    // TODO: array of ids???
    async execute(runId: string): Promise<void> {
        const run = await this.runRepository.findById(runId);
        if (!run) throw new NotFoundException('Run not found');

        const checklist = await this.checklistRepository.findById(run.checklistId);
        if (!checklist) throw new NotFoundException('Checklist not found');

        const currentRunItems = run.runItems;
        const checklistItems = checklist.items ?? [];

        const newRunItemsToAdd = checklistItems
            .filter(checklistItem => !currentRunItems.some(runItem => runItem.checklistItemId === checklistItem.id))
            .map(clItem =>
                RunItem.create({
                    checklistItemId: clItem.id,
                    title: clItem.title,
                    tag: clItem.tag,
                    order: clItem.order,
                    status: 'not_run',
                    comment: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }).toData(),
            );

        const filteredRunItems = currentRunItems.filter(runItem =>
            checklistItems.some(clItem => clItem.id === runItem.checklistItemId),
        );

        const syncedRunItems = filteredRunItems.map(runItem => {
            const correspondingChecklistItem = checklistItems.find(checklistItem => checklistItem.id === runItem.checklistItemId);
            if (!correspondingChecklistItem) return runItem;
            return {
                ...runItem,
                title: correspondingChecklistItem.title,
                tag: correspondingChecklistItem.tag,
                order: correspondingChecklistItem.order,
            };
        });

        const updatedRunItems = [...syncedRunItems, ...newRunItemsToAdd]
            .sort((a, b) => a.order - b.order);

        const updatedRun = Run.create({
            ...run,
            runItems: updatedRunItems,
            updatedAt: new Date(),
        });

        await this.runRepository.save(updatedRun);
    }
}
