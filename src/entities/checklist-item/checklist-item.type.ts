export type NewChecklistItemData = {
    title: string;
    order: number;
    tag?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ChecklistItemData = NewChecklistItemData & {
    id: string;
}