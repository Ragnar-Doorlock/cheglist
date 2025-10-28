import { Injectable } from "@nestjs/common";
import { ChecklistData } from "src/entities/checklist/checklist.type";

@Injectable()
export class UpdateChecklistResponseBuilder {
    async build(checklist: ChecklistData) {
        return {
            id: checklist.id,
            name: checklist.name,
            projectId: checklist.projectId,
            tag: checklist.tag,
            description: checklist.description,
            items: checklist.items,
        };
    }
}
