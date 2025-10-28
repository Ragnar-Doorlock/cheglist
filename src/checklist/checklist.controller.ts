import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ChecklistService } from "./checklist.service";
import { TokenDataDecorator } from "src/token-data.decorator";
import type { TokenData } from "src/token-data.type";
import { CreateChecklistDto } from "./dto/create-checklist.dto";
import { SearchChecklistsDto } from "./dto/search-checklist.dto";
import { UpdateChecklistDto } from "./dto/update-checklist.dto";

@Controller('checklists')
export class ChecklistController {
    constructor(private readonly service: ChecklistService) {}

    @Get(':id')
    get(
        @Param('id') id: string,
        @TokenDataDecorator() tokenData: TokenData,
        @Query('tag') tag?: string,
    ) {
        const requestUserId = tokenData.id;
        return this.service.getChecklistById(id, requestUserId, tag);
    }

    @Post('create')
    create(
        @Body() createChecklistDto: CreateChecklistDto,
        @TokenDataDecorator() tokenData: TokenData,
    ) {
        const requestUserId = tokenData.id;
        return this.service.createChecklist(createChecklistDto, requestUserId);
    }

    @Post('search')
    search(@Body() searchChecklistsDto: SearchChecklistsDto) {
        return this.service.searchChecklists(searchChecklistsDto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateChecklistDto: UpdateChecklistDto,
        @TokenDataDecorator() tokenData: TokenData,
    ) {
        const requestUserId = tokenData.id;
        return this.service.updateChecklist(id, updateChecklistDto, requestUserId)
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
        @TokenDataDecorator() tokenData: TokenData,
    ) {
        const requestUserId = tokenData.id;
        return this.service.deleteChecklist(id, requestUserId);
    }
}
