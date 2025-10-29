import { ChecklistItemData } from "src/entities/checklist-item/checklist-item.type";

export type GetChecklistResponseData = {
    name: string;
    projectId: string;
    items?: ChecklistItemData[];
    description?: string;
    tag?: string;
}
