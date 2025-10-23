import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectRepository } from "../project.repository";
import { GetProjectResponseBuilder } from "./get-project.response-builder";
import { GetProjectResponseData } from "../response-types/get-project.type";

@Injectable()
export class GetProjectInteractor {
    constructor(
        private repository: ProjectRepository,
        private responseBuilder: GetProjectResponseBuilder,
    ) {}

    async execute(id: string, requestUserId: string): Promise<GetProjectResponseData | null> {
        const project = await this.repository.findById(id);
        if (!project) {
            throw new NotFoundException('Project was not found.');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to view these checklists');
        }
        
        return this.responseBuilder.build(project);
    }
}
