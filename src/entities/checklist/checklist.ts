import { ChecklistItem } from "../checklist-item/checklist-item";
import { ChecklistData } from "./checklist.type";

export class Checklist {
    private id: string;
    private projectId: string;
    private title: string;
    private tags: string[];
    private items: ChecklistItem[];
    private createdAt: Date;
    private updatedAt: Date;

    constructor(data: ChecklistData) {
        this.id = data.id;
        this.projectId = data.projectId;
        this.title = data.title;
        this.items = data.items?.map(item => new ChecklistItem(item)) ?? [];
        this.tags = data.tags ?? [];
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    getId(): string {
        return this.id;
    }

    getProjectId():string {
        return this.projectId;
    }

    getTitle(): string {
        return this.title;
    }

    getItems(): ChecklistItem[] {
        return this.items;
    }

    getTags(): string[] {
        return this.tags;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public static create(data: ChecklistData): Checklist {
        return new Checklist(data);
    }
}
