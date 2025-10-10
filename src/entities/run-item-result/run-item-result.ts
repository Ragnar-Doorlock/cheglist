import { RunItemStatus } from 'src/run-item/runItemStatus';
import { RunItemResultData } from './run-item-result.type';


export class RunItemResult {
    private id: string;
    private status: RunItemStatus;
    private comment?: string;

    constructor(data: RunItemResultData) {
        this.id = data.id;
        this.status = data.status ?? 'not_run';
        this.comment = data.comment;
    }

    getItemId(): string {
        return this.id;
    }
    
    getStatus(): string {
        return this.status;
    }

    getComment(): string | undefined {
        return this.comment;
    }

    public static create(data: RunItemResultData): RunItemResult {
        return new RunItemResult(data);
    }
}
