import { BadRequestException, Injectable } from "@nestjs/common";
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
        const project = await this.repository.findOne({ name: projectDto.name, ownerId: requestUserId });
        if (project) {
            throw new BadRequestException('Project with that name already exists');
        }
        const newProject = Project.create({
            name: projectDto.name,
            ownerId: requestUserId,
        });

        await this.repository.save(newProject);
        const projectFromDb = await this.repository.findOne({ name: projectDto.name, ownerId: requestUserId })
        if (!projectFromDb) {
            throw new Error('Created project was not found');
        }
        if (!projectFromDb.id) {
            throw new Error('Created project id is missing');
        }
        return this.responseBuilder.build(projectFromDb);
    }
}
