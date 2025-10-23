import { NewRunData, RunData } from './run.type';
import { RunItem } from '../run-item-result/run-item';
import { runStatus, RunStatus } from 'src/run/runStatus';
import { ObjectId} from 'mongodb';

export class Run {
    private id: string;
    private checklistId: string;
    private tester?: string;
    private status: RunStatus;
    private runItems: RunItem[];
    private startedAt: Date;
    private createdAt: Date;
    private updatedAt: Date;
    private build?: string;

    constructor(data: RunData | NewRunData) {
        this.id = (data as RunData).id ?? new ObjectId().toString();
        this.checklistId = data.checklistId;
        this.tester = data.tester;
        this.status = data.status ?? runStatus.IN_PROGRESS;
        this.runItems = data.runItems?.map(runItem => new RunItem(runItem)) ?? [];
        this.startedAt = data.startedAt || new Date();
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
        this.build = data.build;
    }

    getId(): string {
        return this.id;
    }

    getChecklistId(): string {
        return this.checklistId;
    }

    getTester(): string | undefined {
        return this.tester;
    }

    getStatus(): RunStatus {
        return this.status;
    }

    getRunItems(): RunItem[] {
        return this.runItems;
    }

    getBuild(): string | undefined {
        return this.build;
    }

    getStartedAt(): Date {
        return this.startedAt;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public static create(data: RunData | NewRunData): Run {
        return new Run(data);
    }
}
