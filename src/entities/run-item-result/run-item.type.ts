import { RunItemStatus } from "src/run-item/runItemStatus";

export type NewRunItemData = {
    checklistItemId: string; 
    title: string;
    tag?: string;
    status?: RunItemStatus;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type RunItemData = NewRunItemData & {
    id: string;
};
