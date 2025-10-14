import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "../project.repository";
import { SearchProjectsResponseBuilder } from "./search-projects.repsonse-builder";
import { SearchProjectsDto } from "../dto/search-projects.dto";
import { SearchProjectsResponseData } from "../response-types/search-projects.type";

@Injectable()
export class SearchProjectsInteractor {
    constructor(
        private repository: ProjectRepository,
        private responseBuilder: SearchProjectsResponseBuilder,
    ) {}

    async execute(searchProjectsDto: SearchProjectsDto): Promise<SearchProjectsResponseData[] | []> {
        const projects = await this.repository.findAll(searchProjectsDto);
        return this.responseBuilder.build(projects);
    }
}
