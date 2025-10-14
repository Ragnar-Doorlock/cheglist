import { UserDocument } from "src/db/user.schema";
import { User } from "src/entities/user/user";
import { UserData } from "src/entities/user/user.type";

export function userSchemaToEntity(doc: UserDocument): User {
    return User.create({
        id: doc._id.toString(),
        email: doc.email,
        password: doc.password,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    });
}

export function userEntityToSchema(user: User): UserData {
    return {
        id: user.getId(),
        email: user.getEmail(),
        password: user.getPassword(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
    };
}

export function userSchemaToResponse(doc: UserDocument) {
    return {
        id: doc._id.toString(),
        email: doc.email,
        password: doc.password,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}

