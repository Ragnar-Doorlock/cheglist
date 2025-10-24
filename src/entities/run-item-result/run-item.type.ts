import { RunItemStatus } from "src/run-item/runItemStatus";

export type NewRunItemData = {
    checklistItemId: string; 
    tag?: string;
    order: number;
    title: string;
    status?: RunItemStatus;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type RunItemData = NewRunItemData & {
    id: string;
};
