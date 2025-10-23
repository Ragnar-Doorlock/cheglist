import { RunItemData } from '../run-item-result/run-item.type';
import { RunStatus } from 'src/run/runStatus';

export type NewRunData = {
    checklistId: string;
    tester?: string;
    status: RunStatus;
    runItems: RunItemData[];
    build?: string;
    startedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
};

export type RunData = NewRunData & {
    id: string;
    startedAt: Date;
};