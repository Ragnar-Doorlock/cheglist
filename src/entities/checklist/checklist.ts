import { ChecklistItem } from "../checklist-item/checklist-item";
import { ChecklistData, NewChecklistData } from "./checklist.type";
import { ObjectId } from 'mongodb';

export class Checklist {
    private id: string;
    private projectId: string;
    private order?: number; // TODO: depends on Tag, if tag exists increase order in tag group ??????????????????? may be not ? in 'order?'
    private description?: string;
    private name: string;
    private tag?: string;
    private items: ChecklistItem[];
    private createdAt: Date;
    private updatedAt: Date;

    constructor(data: ChecklistData | NewChecklistData) {
        this.id = (data as ChecklistData).id ?? new ObjectId().toString();
        this.projectId = data.projectId;
        this.name = data.name;
        this.description = data.description;
        this.items = data.items?.map(item => new ChecklistItem(item)) ?? [];
        this.tag = data.tag;
        this.order = data.order;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    getId(): string {
        return this.id;
    }

    getProjectId(): string {
        return this.projectId;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string | undefined {
        return this.description;
    }

    getItems(): ChecklistItem[] {
        return this.items;
    }

    getOrder(): number | undefined {
        return this.order;
    }

    setOrder(order: number) {
        if (order < 1) {
            throw new Error('Checklist order must be >= 1');
        }
        this.order = order;
        this.updatedAt = new Date();
    }

    getTag(): string | undefined {
        return this.tag;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public static create(data: ChecklistData | NewChecklistData): Checklist {
        return new Checklist(data);
    }
}
