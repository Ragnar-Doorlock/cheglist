import { RunItemStatus } from "src/run-item/runItemStatus";

export type RunItemResultData = {
    id: string;
    status: RunItemStatus;
    comment?:string;
}
