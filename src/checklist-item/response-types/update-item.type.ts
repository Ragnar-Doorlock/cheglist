import { ChecklistItem } from "src/entities/checklist-item/checklist-item";

export type UpdateItemResponseData = {
    id: string;
    name: string;
    projectId: string;
    items: ChecklistItem[];
    tag?: string;
}
