import { ChecklistItemData } from "src/entities/checklist-item/checklist-item.type";

export type SearchChecklistsResponseData = {
    id: string;
    name: string;
    projectId: string;
    tag?: string;
    description?: string;
    items?: ChecklistItemData[];
}
