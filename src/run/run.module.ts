import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { RunGatewayModule } from "./run.gateway-module";
import { ChecklistGatewayModule } from "src/checklist/checklist.gateway-module";
import { ProjectGatewayModule } from "src/project/project.gateway-module";
import { RunService } from "./run.service";
import { RunController } from "./run.controller";
import { GetRunInteractor } from "./get-run/get-run.interactor";
import { GetRunResponseBuilder } from "./get-run/get-run.response-builder";
import { SearchRunsInteractor } from "./search-runs/search-runs.interactor";
import { SearchRunsResponseBuilder } from "./search-runs/search-runs.response-builder";
import { CreateRunInteractor } from "./create-run/create-run.interactor";
import { CreateRunResponseBuilder } from "./create-run/create-run.response-builder";
import { UpdateRunInteractor } from "./update-run/update-run.interactor";
import { UpdateRunResponseBuilder } from "./update-run/update-run.response-builder";

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        RunGatewayModule,
        ChecklistGatewayModule,
        ProjectGatewayModule,
    ],
    controllers: [RunController],
    providers: [
        RunService,
        GetRunInteractor,
        GetRunResponseBuilder,
        SearchRunsInteractor,
        SearchRunsResponseBuilder,
        CreateRunInteractor,
        CreateRunResponseBuilder,
        UpdateRunInteractor,
        UpdateRunResponseBuilder,
    ],
})
export class RunModule {}
