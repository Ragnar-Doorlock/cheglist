import { RunItem } from "src/entities/run-item-result/run-item";
import { RunStatus } from "../runStatus";

export type CreateRunResponseData = {
    checklistId: string;
    tester?: string;
    status: RunStatus;
    runItems: RunItem[];
    startedAt: Date;
    build?: string;
}
