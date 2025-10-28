import { Injectable } from "@nestjs/common";
import { ChecklistRepository } from "../checklist.repository";
import { SearchChecklistsResponseBuilder } from "./search-checklists.response-builder";
import { SearchChecklistsResponseData } from "../response-types/search-checklists.type";
import { SearchChecklistsDto } from "../dto/search-checklist.dto";

@Injectable()
export class SearchChecklistsInteractor {
    constructor(
        private repository: ChecklistRepository,
        private responseBuilder: SearchChecklistsResponseBuilder,
    ) {}

    async execute(searchChecklistsDto: SearchChecklistsDto): Promise<SearchChecklistsResponseData[] | []> {
        const checklists = await this.repository.findAll(searchChecklistsDto);
        return this.responseBuilder.build(checklists);
    }
}
