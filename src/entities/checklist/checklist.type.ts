import { ChecklistItemData } from "../checklist-item/checklist-item.type";

export type ChecklistData = {
    id: string;
    projectId: string;
    title: string;
    tags?: string[];
    items?: ChecklistItemData[];
    createdAt?: Date;
    updatedAt?: Date;
}
