import { ChecklistItemData } from "../checklist-item/checklist-item.type";

export type NewChecklistData = {
    projectId: string;
    name: string;
    tag?: string;
    items?: ChecklistItemData[];
    createdAt?: Date;
    updatedAt?: Date;
};

export type ChecklistData = NewChecklistData & {
    id: string;
};
