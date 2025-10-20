import { ObjectId } from 'mongodb';
import { ChecklistItemData, NewChecklistItemData } from './checklist-item.type';

export class ChecklistItem {
    private id: string;
    private title: string;
    private order: number;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(data: ChecklistItemData | NewChecklistItemData) {
        this.id = (data as ChecklistItemData).id ?? new ObjectId().toString();
        this.title = data.title;
        this.order = data.order;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    getId(): string {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getOrder(): number {
        return this.order;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    toData(): ChecklistItemData {
        return {
            id: this.id,
            title: this.title,
            order: this.order,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    public static create(data: ChecklistItemData | NewChecklistItemData): ChecklistItem {
        return new ChecklistItem(data);
    }
}
