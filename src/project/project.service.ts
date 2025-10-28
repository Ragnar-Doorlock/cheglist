import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateProjectInteractor } from "./create-project/create-project.interactor";
import { CreateProjectResponseData } from "./response-types/create-project.type";
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetProjectResponseData } from "./response-types/get-project.type";
import { GetProjectInteractor } from "./get-project/get-project.interactor";
import { SearchProjectsDto } from "./dto/search-projects.dto";
import { SearchProjectsResponseData } from "./response-types/search-projects.type";
import { SearchProjectsInteractor } from "./search-projects/search-projects.interactor";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { UpdateProjectInteractor } from "./update-project/update-project.interactor";
import { UpdateProjectResponseData } from "./response-types/update-project.type";
import { DeleteProjectInteractor } from "./delete-project/delete-project.interactor";

@Injectable()
export class ProjectService {
    constructor(
        private createInteractor: CreateProjectInteractor,
        private getInteractor: GetProjectInteractor,
        private searchInteractor: SearchProjectsInteractor,
        private updateInteractor: UpdateProjectInteractor,
        private deleteInteractor: DeleteProjectInteractor,
    ) {}

    async createProject(createProjectDto: CreateProjectDto, requestUserId: string): Promise<CreateProjectResponseData> {
        try {
            return this.createInteractor.execute(createProjectDto, requestUserId);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getProjectById(id: string, requestUserId: string): Promise<GetProjectResponseData | null> {
        try {
            return this.getInteractor.execute(id, requestUserId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    async searchProjects(searchProjectsDto: SearchProjectsDto): Promise<SearchProjectsResponseData[] | []> {
        try {
            return this.searchInteractor.execute(searchProjectsDto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateProject(id: string, updateProjectDto: UpdateProjectDto, requestUserId: string): Promise<UpdateProjectResponseData> {
        try {
            return this.updateInteractor.execute(id, updateProjectDto, requestUserId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            if (error instanceof ForbiddenException) {
                throw new ForbiddenException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    async deleteProject(id: string, requestUserId: string): Promise<void> {
        try {
            return this.deleteInteractor.execute(id, requestUserId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            if (error instanceof ForbiddenException) {
                throw new ForbiddenException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }
}
