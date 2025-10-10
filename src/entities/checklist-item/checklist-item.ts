import { ChecklistItemData } from "./checklist-item.type";

export class ChecklistItem {
    private id: string;
    private text: string;
    private children: ChecklistItem[];
    private createdAt: Date;
    private updatedAt: Date;

    constructor(data: ChecklistItemData) {
        this.id = data.id;
        this.text = data.text;
        this.children = data.children?.map(child => new ChecklistItem(child)) ?? [];
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    getId(): string {
        return this.id;
    }

    getText(): string {
        return this.text;
    }

    getChildren(): ChecklistItem[] { 
        return this.children;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public static create(data: ChecklistItemData): ChecklistItem {
      return new ChecklistItem(data);
    }
}
