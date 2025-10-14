import { NewProjectData, ProjectData } from "./project.type";
import { ObjectId } from 'mongodb';

export class Project {
    private id: string;
    private name: string;
    private ownerId: string;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(data: ProjectData | NewProjectData) {
        this.id = (data as ProjectData).id ?? new ObjectId().toString();
        this.name = data.name;
        this.ownerId = data.ownerId;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    getId(): string {
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

    public static create(data: ProjectData | NewProjectData): Project {
        return new Project(data);
    }
}
