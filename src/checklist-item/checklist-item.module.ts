import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { AddItemInteractor } from "./add-item/add-item.interactor";
import { AddItemResponseBuilder } from "./add-item/add-item.response-builder";
import { UpdateItemInteractor } from "./update-item/update-item.interactor";
import { UpdateItemResponseBuilder } from "./update-item/update-item.response-builder";
import { ChecklistGatewayModule } from "src/checklist/checklist.gateway-module";
import { ChecklistItemService } from "./checklist-item.service";
import { ChecklistItemController } from "./checklist-item.controller";
import { ProjectGatewayModule } from "src/project/project.gateway-module";
import { RunGatewayModule } from "src/run/run.gateway-module";
import { DeleteItemInteractor } from "./delete-item/delete-item.interactor";
import { DeleteItemResponseBuilder } from "./delete-item/delete-item.response-builder";

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        ChecklistGatewayModule,
        ProjectGatewayModule,
        RunGatewayModule,
    ],
    controllers: [ChecklistItemController],
    providers: [
        ChecklistItemService,
        AddItemInteractor,
        AddItemResponseBuilder,
        UpdateItemInteractor,
        UpdateItemResponseBuilder,
        DeleteItemInteractor,
        DeleteItemResponseBuilder,
    ],
})
export class ChecklistItemModule {}
