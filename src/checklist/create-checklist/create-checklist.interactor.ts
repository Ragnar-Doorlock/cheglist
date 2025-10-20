import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateChecklistResponseBuilder } from "./create-checklist.response-builder";
import { ChecklistRepository } from "../checklist.repository";
import { ProjectRepository } from "src/project/project.repository";
import { CreateChecklistDto } from "../dto/create-checklist.dto";
import { CreateChecklistResponseData } from "../response-types/create-checklist.type";
import { Checklist } from "src/entities/checklist/checklist";

@Injectable()
export class CreateChecklistInteractor {
    constructor(
        private responseBuilder: CreateChecklistResponseBuilder,
        private checklistRepository: ChecklistRepository,
        private projectRepository: ProjectRepository,
    ) {}

    async execute(checklistDto: CreateChecklistDto, requestUserId: string): Promise<CreateChecklistResponseData> {
        const project = await this.projectRepository.findOne({ id: checklistDto.projectId });
        if(!project) {
            throw new NotFoundException('Project not found');
        }
        if(project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to create a checklist in this project');
        }

        const newChecklist = Checklist.create({
            name: checklistDto.name,
            projectId: checklistDto.projectId,
            tag: checklistDto.tag,
        });
        await this.checklistRepository.save(newChecklist);
        return this.responseBuilder.build(newChecklist);
    }
}
