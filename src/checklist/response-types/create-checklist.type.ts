import { ChecklistItem } from "src/entities/checklist-item/checklist-item";

export type CreateChecklistResponseData = {
    name: string;
    projectId: string;
    items?: ChecklistItem[];
    tag?: string;
}
