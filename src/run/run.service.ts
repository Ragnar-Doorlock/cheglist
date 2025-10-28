import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { GetRunInteractor } from "./get-run/get-run.interactor";
import { GetRunResponseData } from "./response-types/get-run.type";
import { SearchRunsInteractor } from "./search-runs/search-runs.interactor";
import { SearchRunsResponseData } from "./response-types/search-runs.type";
import { CreateRunInteractor } from "./create-run/create-run.interactor";
import { CreateRunDto } from "./dto/create-run.dto";
import { UpdateRunInteractor } from "./update-run/update-run.interactor";
import { UpdateRunResponseData } from "./response-types/update-run.type";
import { UpdateRunDto } from "./dto/update-run.dto";
import { SyncRunWithChecklistInteractor } from "./sync-run-with-checklist/sync-run-with-checklist.interactor";
import { DeleteRunInteractor } from "./delete-run/delete-run.interactor";

@Injectable()
export class RunService {
    constructor(
        private getInteractor: GetRunInteractor,
        private searchInteractor: SearchRunsInteractor,
        private createInteractor: CreateRunInteractor,
        private updateInteractor: UpdateRunInteractor,
        private syncInteractor: SyncRunWithChecklistInteractor,
        private deleteInteractor: DeleteRunInteractor,
    ) {}

    async create(
        dto: CreateRunDto,
        requestUserId: string,
    ) {
        try {
            return this.createInteractor.execute(dto, requestUserId);
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

    async getById(
        id: string,
        requestUserId: string,
    ): Promise<GetRunResponseData | null> {
        try {
            return this.getInteractor.execute(id, requestUserId);
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

    async searchRuns(
        checklistId: string,
        requestUserId: string,
    ): Promise<SearchRunsResponseData[] | []> {
        try {
            return this.searchInteractor.execute(checklistId, requestUserId);
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

    async update(
        id: string,
        dto: UpdateRunDto,
        requestUserId: string,
    ): Promise<UpdateRunResponseData> {
        try {
            return this.updateInteractor.execute(id, dto, requestUserId);
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

    async syncAllRunsWithChecklist(id: string) {
        try {
            await this.syncInteractor.execute(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    async delete(id: string, requestUserId: string): Promise<void> {
        try {
            return this.deleteInteractor.execute(id, requestUserId);
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
}
