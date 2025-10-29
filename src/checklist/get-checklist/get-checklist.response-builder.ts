import { Injectable } from "@nestjs/common";
import { ChecklistData } from "src/entities/checklist/checklist.type";

@Injectable()
export class GetChecklistResponseBuilder {
    async build(checklist: ChecklistData) {
        return {
            name: checklist.name,
            projectId: checklist.projectId,
            items: checklist.items,
            description: checklist.description,
            tag: checklist.tag,
        };
    }
}
