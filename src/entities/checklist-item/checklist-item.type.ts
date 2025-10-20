export type NewChecklistItemData = {
    title: string;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ChecklistItemData = NewChecklistItemData & {
    id: string;
}