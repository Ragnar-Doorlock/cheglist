import { Injectable } from "@nestjs/common";
import { ChecklistData } from "src/entities/checklist/checklist.type";

@Injectable()
export class SearchChecklistsResponseBuilder {
    async build(checklists: ChecklistData[]) {
        return checklists.map((x) => ({
            id: x.id,
            name: x.name,
            projectId: x.projectId,
            description: x.description,
            tag: x.tag,
        }));
    }
}
