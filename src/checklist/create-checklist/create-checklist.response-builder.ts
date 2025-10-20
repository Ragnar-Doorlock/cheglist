import { Injectable } from "@nestjs/common";
import { Checklist } from "src/entities/checklist/checklist";

@Injectable()
export class CreateChecklistResponseBuilder {
    async build(checklist: Checklist) {
        return {
            name: checklist.getName(),
            projectId: checklist.getProjectId(),
            items: checklist.getItems(),
            tag: checklist.getTag(),
        }
    }
}
