import { ChecklistItem } from "src/entities/checklist-item/checklist-item";

export type AddItemResponseData = {
    name: string;
    projectId: string;
    items: ChecklistItem[];
    tag?: string;
}
