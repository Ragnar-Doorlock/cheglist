import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateChecklistInteractor } from "./create-checklist/create-checklist.interactor";
import { CreateChecklistDto } from "./dto/create-checklist.dto";
import { GetChecklistInteractor } from "./get-checklist/get-checklist.interactor";
import { SearchChecklistsInteractor } from "./search-checklist/serach-checklists.interactor";
import { SearchChecklistsDto } from "./dto/search-checklist.dto";
import { CreateChecklistResponseData } from "./response-types/create-checklist.type";
import { GetChecklistResponseData } from "./response-types/get-checklist.type";
import { SearchChecklistsResponseData } from "./response-types/search-checklists.type";
import { UpdateChecklistDto } from "./dto/update-checklist.dto";
import { UpdateChecklistInteractor } from "./update-checklist/update-checklist.interactor";
import { UpdateChecklistResponseData } from "./response-types/update-checklist.type";

@Injectable()
export class ChecklistService {
    constructor(
        private createInteractor: CreateChecklistInteractor,
        private getInteractor: GetChecklistInteractor,
        private searchInteractor: SearchChecklistsInteractor,
        private updateInteractor: UpdateChecklistInteractor,
    ) {}

    async createChecklist(
        createChecklistDto: CreateChecklistDto,
        requestUserId: string,
    ): Promise<CreateChecklistResponseData> {
        try {
            return this.createInteractor.execute(createChecklistDto, requestUserId)
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw new ForbiddenException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    async getChecklistById(id: string): Promise<GetChecklistResponseData | null> {
        try {
            return this.getInteractor.execute(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    async searchChecklists(searchChecklistsDto: SearchChecklistsDto): Promise<SearchChecklistsResponseData[] | []> {
        try {
            return this.searchInteractor.execute(searchChecklistsDto)
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async updateChecklist(
        id: string,
        updateChecklistDto: UpdateChecklistDto,
        requestUserId: string,
    ): Promise<UpdateChecklistResponseData> {
        try {
            return this.updateInteractor.execute(id, updateChecklistDto, requestUserId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            if (error instanceof ForbiddenException) {
                throw new ForbiddenException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    async deleteChecklist() {
        //TODO
    }
}
