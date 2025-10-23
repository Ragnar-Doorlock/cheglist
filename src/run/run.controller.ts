import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { RunService } from "./run.service";
import { TokenDataDecorator } from "src/token-data.decorator";
import type { TokenData } from "src/token-data.type";
import { CreateRunDto } from "./dto/create-run.dto";
import { UpdateRunDto } from "./dto/update-run.dto";

@Controller('runs')
export class RunController {
    constructor(private readonly service: RunService) {}

    @Get(':id')
    get(
        @Param('id') id: string,
        @TokenDataDecorator() tokenData: TokenData,
    ) {
        const requestUserId = tokenData.id;
        return this.service.getById(id, requestUserId);
    }

    @Get('checklist/:id')
    searchChecklistRuns(
        @Param('id') checklistId: string,
        @TokenDataDecorator() tokenData: TokenData,
    ) {
        const requestUserId = tokenData.id;
        return this.service.searchRuns(checklistId, requestUserId);
    }

    @Post('create')
    create(
        @Body() dto: CreateRunDto,
        @TokenDataDecorator() tokenData: TokenData,
    ) {
        const requestUserId = tokenData.id;
        return this.service.create(dto, requestUserId);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateRunDto: UpdateRunDto,
        @TokenDataDecorator() tokenData: TokenData,
    ) {
        const requestUserId = tokenData.id;
        return this.service.update(id, updateRunDto, requestUserId);
    }
}
