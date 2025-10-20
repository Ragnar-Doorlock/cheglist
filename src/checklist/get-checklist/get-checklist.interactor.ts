import { Injectable, NotFoundException } from "@nestjs/common";
import { ChecklistRepository } from "../checklist.repository";
import { GetChecklistResponseBuilder } from "./get-checklist.response-builder";
import { GetChecklistResponseData } from "../response-types/get-checklist.type";

@Injectable()
export class GetChecklistInteractor {
    constructor(
        private repository: ChecklistRepository,
        private responseBuilder: GetChecklistResponseBuilder,
    ) {}

    async execute(id: string): Promise<GetChecklistResponseData | null> {
        const checklist = await this.repository.findById(id);
        if (!checklist) {
            throw new NotFoundException('Checklist was not found.');
        }
        return this.responseBuilder.build(checklist);
    }
}
