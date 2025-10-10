import { RunData } from './run.type';
import { RunItemResult } from '../run-item-result/run-item-result';

export class Run {
    private id: string;
    private checklistId: string;
    private testerId: string;
    private status: 'in_progress' | 'completed'; // TODO: use enum
    private results: RunItemResult[];
    private startedAt: Date;

    constructor(data: RunData) {
        this.id = data.id;
        this.checklistId = data.checklistId;
        this.testerId = data.testerId;
        this.status = data.status ?? 'in_progress';
        this.results = data.results?.map(result => new RunItemResult(result)) ?? [];
        this.startedAt = data.startedAt || new Date();
    }

    getId(): string {
        return this.id;
    }

    getChecklistId(): string {
        return this.checklistId;
    }

    getTesterId(): string {
        return this.testerId;
    }

    getStatus(): string {
        return this.status;
    }

    getResults(): RunItemResult[] {
        return this.results;
    }

    getStartedAt(): Date {
        return this.startedAt;
    }

    public static create(data: RunData): Run {
        return new Run(data);
    }
}
