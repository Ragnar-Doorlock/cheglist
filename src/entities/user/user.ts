import { NewUserData, UserData } from "./user.type";
import { ObjectId } from 'mongodb';

export class User {
    private id: string;
    private email: string;
    private password: string;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(data: UserData | NewUserData) {
        this.id = (data as UserData).id ?? new ObjectId().toString();
        this.email = data.email;
        this.password = data.password;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    getId(): string {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public static create(data: UserData | NewUserData): User {
        return new User(data);
    }
}
