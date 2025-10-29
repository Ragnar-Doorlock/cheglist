import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { TokenDataDecorator } from "src/token-data.decorator";
import type { TokenData } from "src/token-data.type";
import { CreateChecklistItemDto } from "../checklist-item/dto/create-checklist-item.dto";
import { ChecklistItemService } from "./checklist-item.service";
import { UpdateChecklistItemDto } from "./dto/update-checklist-item.dto";

@Controller('checklists/:checklistId/items')
export class ChecklistItemController {
    constructor(private readonly service: ChecklistItemService) {}

    @Post()
    addItem(
        @Param('checklistId') checklistId: string,
        @Body() createChecklistItemDto: CreateChecklistItemDto,
        @TokenDataDecorator() tokenData: TokenData,
    ) {
        const requestUserId = tokenData.id;
        return this.service.addItem(checklistId, createChecklistItemDto, requestUserId);
    }

    @Patch(':itemId')
    updateItem(
        @Param('checklistId') checklistId: string,
        @Param('itemId') itemId: string,
        @Body() updateChecklistItemDto: UpdateChecklistItemDto,
        @TokenDataDecorator() tokenData: TokenData,
    ) {
        const requestUserId = tokenData.id;
        return this.service.updateItem(checklistId, itemId, updateChecklistItemDto, requestUserId);
    }

    @Delete(':itemId')
    delete(
        @Param('checklistId') checklistId: string,
        @Param('itemId') itemId: string,
        @TokenDataDecorator() tokenData: TokenData,
    ) {
        const requestUserId = tokenData.id;
        return this.service.deleteChecklistItem(checklistId, itemId, requestUserId);
    }
}
