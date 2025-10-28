import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ChecklistRepository } from "../checklist.repository";
import { GetChecklistResponseBuilder } from "./get-checklist.response-builder";
import { GetChecklistResponseData } from "../response-types/get-checklist.type";
import { ProjectRepository } from "src/project/project.repository";

@Injectable()
export class GetChecklistInteractor {
    constructor(
        private checklistRepository: ChecklistRepository,
        private responseBuilder: GetChecklistResponseBuilder,
        private projectRepository: ProjectRepository,
    ) {}

    async execute(id: string, requestUserId: string, tag?: string): Promise<GetChecklistResponseData | null> {
        const checklist = await this.checklistRepository.findById(id);
        if (!checklist) {
            throw new NotFoundException('Checklist was not found.');
        }
        const project = await this.projectRepository.findById(checklist.projectId);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to view this checklist');
        }

        const filteredItems = tag
            ? checklist.items?.filter(item => item.tag === tag)
            : checklist.items;
        
            
        return this.responseBuilder.build({
            ...checklist,
            items: filteredItems,
        });
    }
}
