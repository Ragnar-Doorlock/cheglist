import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { ProjectGatewayModule } from "./project.gateway-module";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { CreateProjectInteractor } from "./create-project/create-project.interactor";
import { CreateProjectResponseBuilder } from "./create-project/create-project.response-builder";
import { GetProjectInteractor } from "./get-project/get-project.interactor";
import { GetProjectResponseBuilder } from "./get-project/get-project.response-builder";
import { SearchProjectsInteractor } from "./search-projects/search-projects.interactor";
import { SearchProjectsResponseBuilder } from "./search-projects/search-projects.repsonse-builder";
import { UpdateProjectInteractor } from "./update-project/update-project.interactor";
import { UpdateProjectResponseBuilder } from "./update-project/update-project.response-builder";

@Module({
    imports: [ConfigModule, AuthModule, ProjectGatewayModule],
    controllers: [ProjectController],
    providers: [
        ProjectService,
        CreateProjectInteractor,
        CreateProjectResponseBuilder,
        GetProjectInteractor,
        GetProjectResponseBuilder,
        SearchProjectsInteractor,
        SearchProjectsResponseBuilder,
        UpdateProjectInteractor,
        UpdateProjectResponseBuilder,
    ],
})
export class ProjectModule {}
