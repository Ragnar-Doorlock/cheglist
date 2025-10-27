import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UpdateRunItemInteractor } from "./update-run-item/update-run-item.interactor";
import { UpdateRunItemDto } from "./dto/update-run-item.dto";

@Injectable()
export class RunItemService {
    constructor(
        private updateItemInteractor: UpdateRunItemInteractor,
    ) {}

    async updateItem(
        runId: string,
        runItemId: string,
        dto: UpdateRunItemDto,
        requestUserId: string,
    ) {
        try {
            return this.updateItemInteractor.execute(runId, runItemId, dto, requestUserId);
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
