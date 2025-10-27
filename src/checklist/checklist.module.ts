import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { ChecklistGatewayModule } from "./checklist.gateway-module";
import { ChecklistController } from "./checklist.controller";
import { ChecklistService } from "./checklist.service";
import { GetChecklistInteractor } from "./get-checklist/get-checklist.interactor";
import { GetChecklistResponseBuilder } from "./get-checklist/get-checklist.response-builder";
import { CreateChecklistInteractor } from "./create-checklist/create-checklist.interactor";
import { CreateChecklistResponseBuilder } from "./create-checklist/create-checklist.response-builder";
import { UpdateChecklistInteractor } from "./update-checklist/update-checklist.interactor";
import { UpdateChecklistResponseBuilder } from "./update-checklist/update-checklist.reponse-builder";
import { SearchChecklistsInteractor } from "./search-checklist/searach-checklists.interactor";
import { SearchChecklistsResponseBuilder } from "./search-checklist/search-checklists.response-builder";
import { ProjectGatewayModule } from "src/project/project.gateway-module";

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        ChecklistGatewayModule,
        ProjectGatewayModule,
    ],
    controllers: [ChecklistController],
    providers: [
        ChecklistService,
        GetChecklistInteractor,
        GetChecklistResponseBuilder,
        CreateChecklistInteractor,
        CreateChecklistResponseBuilder,
        UpdateChecklistInteractor,
        UpdateChecklistResponseBuilder,
        SearchChecklistsInteractor,
        SearchChecklistsResponseBuilder,
    ],
})
export class ChecklistModule {}
