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

@Module({
    imports: [ConfigModule, AuthModule, ChecklistGatewayModule, ProjectGatewayModule],
    controllers: [ChecklistItemController],
    providers: [
        ChecklistItemService,
        AddItemInteractor,
        AddItemResponseBuilder,
        UpdateItemInteractor,
        UpdateItemResponseBuilder,
    ],
})
export class ChecklistItemModule {}
