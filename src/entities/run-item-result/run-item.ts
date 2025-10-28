import { ObjectId } from 'mongodb';
import { RunItemData, NewRunItemData } from './run-item.type';
import { runItemStatus, RunItemStatus } from 'src/run-item/runItemStatus';

export class RunItem {
    private id: string;
    private checklistItemId: string;
    title: string;
    private tag?: string;
    private order: number;
    private status: RunItemStatus;
    private comment?: string;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(data: RunItemData | NewRunItemData) {
        this.id = (data as RunItemData).id ?? new ObjectId().toString();
        this.checklistItemId = data.checklistItemId;
        this.tag = data.tag;
        this.title = data.title;
        this.order = data.order;
        this.status = data.status ?? runItemStatus.NOT_RUN;
        this.comment = data.comment;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    getId(): string {
        return this.id;
    }

    getChecklistItemId(): string {
        return this.checklistItemId;
    }

    getTag(): string | undefined {
        return this.tag;
    }

    getTitle(): string {
        return this.title;
    }

    getOrder(): number {
        return this.order;
    }

    getStatus(): RunItemStatus {
        return this.status;
    }

    getComment(): string | undefined {
        return this.comment;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    toData(): RunItemData {
        return {
            id: this.id,
            checklistItemId: this.checklistItemId,
            tag: this.tag,
            order: this.order,
            title: this.title,
            status: this.status,
            comment: this.comment,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    public static create(data: RunItemData | NewRunItemData): RunItem {
        return new RunItem(data);
    }
}
