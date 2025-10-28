import { Injectable } from "@nestjs/common";
import { Checklist } from "src/entities/checklist/checklist";

@Injectable()
export class CreateChecklistResponseBuilder {
    async build(checklist: Checklist) {
        return {
            //TODO: return ID?? db can have multiple checklists with the same name already
            name: checklist.getName(),
            projectId: checklist.getProjectId(),
            items: checklist.getItems(),
            tag: checklist.getTag(),
            description: checklist.getDescription(),
        }
    }
}
