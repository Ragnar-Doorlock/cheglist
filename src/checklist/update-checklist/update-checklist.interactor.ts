import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ChecklistRepository } from "../checklist.repository";
import { UpdateChecklistResponseBuilder } from "./update-checklist.reponse-builder";
import { ProjectRepository } from "src/project/project.repository";
import { UpdateChecklistDto } from "../dto/update-checklist.dto";
import { UpdateChecklistResponseData } from "../response-types/update-checklist.type";
import { Checklist } from "src/entities/checklist/checklist";

@Injectable()
export class UpdateChecklistInteractor {
    constructor(
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
        private responseBuilder: UpdateChecklistResponseBuilder, 
    ) {}

    async execute(
        id: string,
        updateChecklistDto: UpdateChecklistDto,
        requestUserId: string,
    ): Promise<UpdateChecklistResponseData> {
        const checklist = await this.checklistRepository.findById(id);
        if(!checklist) {
            throw new NotFoundException('Checklist not found');
        }
        const project = await this.projectRepository.findOne({ id: checklist.projectId });
        if(!project) {
            throw new Error('Project not found');
        }
        if(project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to update this checklist');
        }

        const updatedChecklist = Checklist.create({
            id: checklist.id,
            name: updateChecklistDto.name ?? checklist.name,
            projectId: checklist.projectId,
            description: updateChecklistDto.description ?? checklist.description,
            tag: updateChecklistDto.tag ?? checklist.tag,
            items: checklist.items,
        });
        await this.checklistRepository.save(updatedChecklist);
        const updatedChecklistFromDb = await this.checklistRepository.findById(id);
        if (!updatedChecklistFromDb) {
            throw new NotFoundException('Updated checklist not found');
        }
        if(!updatedChecklistFromDb.id) {
            throw new Error('Updated checklist ID is missing');
        }
        return this.responseBuilder.build(updatedChecklistFromDb);
    }
}
