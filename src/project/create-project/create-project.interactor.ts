import { Injectable } from "@nestjs/common";
import { CreateProjectResponseData } from "../response-types/create-project.type";
import { Project } from "src/entities/project/project";
import { ProjectRepository } from "../project.repository";
import { CreateProjectResponseBuilder } from "./create-project.response-builder";
import { CreateProjectDto } from "../dto/create-project.dto";

@Injectable()
export class CreateProjectInteractor {
    constructor (
        private repository: ProjectRepository,
        private responseBuilder: CreateProjectResponseBuilder,
    ) {}

    async execute(projectDto: CreateProjectDto, requestUserId: string): Promise<CreateProjectResponseData> {
        const newProject = Project.create({
            name: projectDto.name,
            ownerId: requestUserId,
        });

        await this.repository.save(newProject);
        return this.responseBuilder.build(newProject);
    }
}
