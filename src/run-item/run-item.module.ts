import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { ChecklistGatewayModule } from "src/checklist/checklist.gateway-module";
import { ProjectGatewayModule } from "src/project/project.gateway-module";
import { RunItemController } from "./run-item.controller";
import { RunItemService } from "./run-item.service";
import { UpdateRunItemInteractor } from "./update-run-item/update-run-item.interactor";
import { UpdateRunItemResponseBuilder } from "./update-run-item/update-run-item.response-builder";
import { RunGatewayModule } from "src/run/run.gateway-module";

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        RunGatewayModule,
        ChecklistGatewayModule,
        ProjectGatewayModule,
    ],
    controllers: [RunItemController],
    providers: [
        RunItemService,
        UpdateRunItemInteractor,
        UpdateRunItemResponseBuilder,
    ],
})
export class RunItemModule {}
