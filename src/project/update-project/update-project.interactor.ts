import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectRepository } from "../project.repository";
import { UpdateProjectResponseBuilder } from "./update-project.response-builder";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { UpdateProjectResponseData } from "../response-types/update-project.type";
import { Project } from "src/entities/project/project";

@Injectable()
export class UpdateProjectInteractor {
    constructor(
        private repository: ProjectRepository,
        private responseBuilder: UpdateProjectResponseBuilder,
    ) {}

    async execute(id: string, updateProjectDto: UpdateProjectDto, requestUserId: string): Promise<UpdateProjectResponseData> {
        const project = await this.repository.findById(id);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        if (project.ownerId !== requestUserId) {
            throw new ForbiddenException('You do not have permission to update this project');
        }

        const updatedProject = Project.create({
            id: project.id,
            name: updateProjectDto.name || project.name,
            ownerId: project.ownerId,
        });
        await this.repository.save(updatedProject);
        const updatedProjectFromDb = await this.repository.findById(id);
        if (!updatedProjectFromDb) {
            throw new NotFoundException('Updated project not found');
        }
        return this.responseBuilder.build(updatedProjectFromDb);
    }
}
