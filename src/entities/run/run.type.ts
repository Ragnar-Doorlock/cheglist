import { RunStatus } from "src/run/runStatus";
import { RunItemResultData } from "../run-item-result/run-item-result.type";

export type RunData = {
    id: string;
    checklistId: string;
    testerId: string;
    status: RunStatus;
    results?: RunItemResultData[];
    startedAt?: Date;
}
