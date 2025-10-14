import { ProjectData } from "./project.type";

export class Project {
    private id?: string;
    private name: string;
    private ownerId: string;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(data: ProjectData) {
        this.id = data.id;
        this.name = data.name;
        this.ownerId = data.ownerId;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    getId(): string | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getOwnerId(): string {
        return this.ownerId;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public static create(data: ProjectData): Project {
        return new Project(data);
    }
}
