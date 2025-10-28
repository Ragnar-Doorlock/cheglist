import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ChecklistRepository } from "src/checklist/checklist.repository";
import { ProjectRepository } from "src/project/project.repository";
import { RunRepository } from "src/run/run.repository";
import { UpdateRunItemDto } from "../dto/update-run-item.dto";
import { UpdateRunItemResponseData } from "../response-types/update-run-item.type";
import { RunItem } from "src/entities/run-item-result/run-item";
import { Run } from "src/entities/run/run";
import { UpdateRunItemResponseBuilder } from "./update-run-item.response-builder";
import { runStatus } from "src/run/runStatus";

@Injectable()
export class UpdateRunItemInteractor {
    constructor(
        private runRepository: RunRepository,
        private responseBuilder: UpdateRunItemResponseBuilder,
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
    ) {}

    async execute(
        runId: string,
        runItemId: string,
        dto: UpdateRunItemDto,
        requestUserId: string,
    ): Promise<UpdateRunItemResponseData> {
        const run = await this.runRepository.findById(runId);
        if (!run) {
            throw new NotFoundException('Run not found');
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
            throw new ForbiddenException('You do not have permission to edit this run');
        }

        if (run.status !== runStatus.IN_PROGRESS) {
            throw new BadRequestException('Run is completed');
        }

        const runItems = run.runItems;
        const itemIndex = runItems.findIndex(i => i.id === runItemId);
        if (itemIndex === -1) {
            throw new NotFoundException(`Run item with id ${runItemId} was not found`);
        }

        const oldItem = runItems[itemIndex];
        const updatedItem = RunItem.create({
            id: oldItem.id,
            checklistItemId: oldItem.checklistItemId,
            title: oldItem.title,
            tag: oldItem.tag,
            order: oldItem.order,
            status: dto.status,
            comment: dto.comment,
            updatedAt: new Date(),
        });

        const updatedItems = [...runItems];
        updatedItems[itemIndex] = updatedItem.toData();

        const updatedRun = Run.create({
            ...run,
            runItems: updatedItems,
        });

        await this.runRepository.save(updatedRun);

        const updatedRunFromDb = await this.runRepository.findById(runId);
        if (!updatedRunFromDb) {
            throw new Error('Updated run not found');
        }
        return this.responseBuilder.build(updatedRunFromDb);

        //TODO Change run status to 'completed' if there are no 'not run' statuses
    }
}
