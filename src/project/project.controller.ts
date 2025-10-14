import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { SearchProjectsDto } from "./dto/search-projects.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { TokenDataDecorator } from "src/token-data.decorator";
import type { TokenData } from "src/token-data.type";

@Controller('projects')
export class ProjectController {
    constructor(private readonly service: ProjectService) {}

    @Get(':id')
    get(@Param('id') id: string) {
        return this.service.getProjectById(id);
    }

    @Post('create')
    create(@Body() createProjectDto: CreateProjectDto, @TokenDataDecorator() tokenData: TokenData) {
        const requestUserId = tokenData.id;
        return this.service.createProject(createProjectDto, requestUserId);
    }

    @Post('search')
    search(@Body() searchProjectsDto: SearchProjectsDto) {
        return this.service.searchProjects(searchProjectsDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @TokenDataDecorator() tokenData: TokenData) {
        const requestUserId = tokenData.id;
        return this.service.updateProject(id, updateProjectDto, requestUserId);
    }

    // @Delete(':id') TODO
}
