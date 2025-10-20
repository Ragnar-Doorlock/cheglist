import { Injectable } from "@nestjs/common";
import { ChecklistItem } from "src/entities/checklist-item/checklist-item";
import { ChecklistData } from "src/entities/checklist/checklist.type";

@Injectable()
export class AddItemResponseBuilder {
    async build(checklist: ChecklistData) {
        return {
            id: checklist.id,
            name: checklist.name,
            tag: checklist.tag,
            items: (checklist.items ?? []).map(item => new ChecklistItem(item)),
            projectId: checklist.projectId,
        };
    }
}
