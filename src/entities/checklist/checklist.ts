import { ChecklistItem } from "../checklist-item/checklist-item";
import { ChecklistData, NewChecklistData } from "./checklist.type";
import { ObjectId } from 'mongodb';

export class Checklist {
    private id: string;
    private projectId: string;
    // private order: number; TODO maybe will be needed
    private name: string;
    private tag?: string;
    private items: ChecklistItem[];
    private createdAt: Date;
    private updatedAt: Date;

    constructor(data: ChecklistData | NewChecklistData) {
        this.id = (data as ChecklistData).id ?? new ObjectId().toString();
        this.projectId = data.projectId;
        this.name = data.name;
        this.items = data.items?.map(item => new ChecklistItem(item)) ?? [];
        this.tag = data.tag;
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

    getItems(): ChecklistItem[] {
        return this.items;
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
