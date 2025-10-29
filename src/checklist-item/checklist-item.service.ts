import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateChecklistItemDto } from "../checklist-item/dto/create-checklist-item.dto";
import { AddItemResponseData } from "../checklist-item/response-types/add-item.type";
import { UpdateChecklistItemDto } from "../checklist-item/dto/update-checklist-item.dto";
import { AddItemInteractor } from "./add-item/add-item.interactor";
import { UpdateItemInteractor } from "./update-item/update-item.interactor";
import { UpdateItemResponseData } from "./response-types/update-item.type";
import { DeleteItemInteractor } from "./delete-item/delete-item.interactor";

@Injectable()
export class ChecklistItemService {
    constructor(
        private addItemInteractor: AddItemInteractor,
        private updateItemInteractor: UpdateItemInteractor,
        private deleteItemInteractor: DeleteItemInteractor,
    ) {}

    async addItem(
        checklistId: string,
        createChecklistItemDto: CreateChecklistItemDto,
        requestUserId: string,
    ): Promise<AddItemResponseData> {
        try {
            return this.addItemInteractor.execute(checklistId, createChecklistItemDto, requestUserId);
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

    async updateItem(
        checklistId: string,
        itemId: string,
        updateChecklistItemDto: UpdateChecklistItemDto,
        requestUserId: string,
    ): Promise<UpdateItemResponseData> {
        try {
            return this.updateItemInteractor.execute(
                checklistId,
                itemId,
                updateChecklistItemDto,
                requestUserId,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            if(error instanceof ForbiddenException) {
                throw new ForbiddenException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    async deleteChecklistItem(
        checklistId: string,
        itemId: string,
        requestUserId: string,
    ) {
        try {
            return this.deleteItemInteractor.execute(
                checklistId,
                itemId,
                requestUserId,
            )
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
