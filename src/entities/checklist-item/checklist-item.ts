import { ObjectId } from 'mongodb';
import {
    ChecklistItemData,
    NewChecklistItemData,
} from './checklist-item.type';
import { ChecklistItemView } from './checklist-item-view';
import { checklistItemView } from './checklist-item-view';

export class ChecklistItem {
    private id: string;
    private type: ChecklistItemView;
    private order: number;
    private title: string;
    private items?: ChecklistItem[];
    private createdAt: Date;
    private updatedAt: Date;

    constructor(data: ChecklistItemData | NewChecklistItemData) {
        this.id = (data as ChecklistItemData).id ?? new ObjectId().toString();
        this.type = data.type;
        this.order = data.order;
        this.title = data.title;

        if (data.type === 'group') {
            this.items = data.items?.map(item => new ChecklistItem(item)) ?? [];
        }

        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
    }

    isGroup(): boolean {
        return this.type === 'group';
    }

    isCheck(): boolean {
        return this.type === 'plain';
    }

    getId(): string {
        return this.id;
    }

    getType(): ChecklistItemView {
        return this.type;
    }

    getOrder(): number {
        return this.order;
    }

    getTitle(): string {
        return this.title;
    }

    getItems(): ChecklistItem[] {
        if (this.type !== 'group') {
            throw new Error('ChecklistItem is not a group');
        }

        return this.items ?? [];
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    toData(): ChecklistItemData {
        if (this.type === checklistItemView.GROUP) {
            if (!this.items) {
                throw new Error('ChecklistItemGroup must contain items');
            }

            return {
                id: this.id,
                type: 'group',
                title: this.title,
                order: this.order,
                items: this.items.map(item => item.toData()),
                createdAt: this.createdAt,
                updatedAt: this.updatedAt,
            };
        }

        return {
            id: this.id,
            type: 'plain',
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
