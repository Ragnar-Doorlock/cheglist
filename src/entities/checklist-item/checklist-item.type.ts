export type ChecklistItemData = {
    id: string;
    text: string;
    children?: ChecklistItemData[];
    createdAt?: Date;
    updatedAt?: Date;
}
