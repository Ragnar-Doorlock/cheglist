import { RunStatus } from "../runStatus";
import { RunItemData } from "src/entities/run-item-result/run-item.type";

export type GetRunResponseData = {
    checklistId: string;
    tester?: string;
    status: RunStatus;
    runItems: RunItemData[];
    startedAt: Date;
    build?: string;
}
