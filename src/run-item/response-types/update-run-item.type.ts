import { RunItem } from "src/entities/run-item-result/run-item";
import { RunStatus } from "src/run/runStatus";

export type UpdateRunItemResponseData = {
    id: string;
    checklistId: string;
    order: number;
    tester?: string;
    status: RunStatus;
    runItems: RunItem[];
    startedAt: Date;
    build?: string;
};
