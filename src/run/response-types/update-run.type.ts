import { RunStatus } from "../runStatus";

export type UpdateRunResponseData = {
    id: string;
    checklistId: string;
    tester?: string;
    status: RunStatus;
    startedAt: Date;
    build?: string;
}
