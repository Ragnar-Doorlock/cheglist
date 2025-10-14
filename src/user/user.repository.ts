import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "../db/user.schema";
import { User } from "src/entities/user/user";
import { UserData } from "src/entities/user/user.type";
import { userSchemaToResponse } from "./user.data-converter";
import { SearchUsersDto } from "./dto/search-users.dto";

export class UserRepository {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async save(user: User): Promise<UserData> {
        if (!user.getId()) {
            const created = await this.userModel.create({
                email: user.getEmail(),
                password: user.getPassword(),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return userSchemaToResponse(created);
        }

        const updated = await this.userModel.findOneAndUpdate(
            { _id: user.getId() },
                {
                    email: user.getEmail(),
                    password: user.getPassword(),
                    updatedAt: new Date(),
                },
            { new: true },
        ).exec();

        if (!updated) {
            throw new Error(`User with id ${user.getId()} not found`);
        }
        return userSchemaToResponse(updated);
    }


    async findById(id: string): Promise<UserData | null> {
        const doc = await this.userModel.findById(id).exec();
        return doc ? userSchemaToResponse(doc) : null;
    }

    async findAll({ids, email}: SearchUsersDto): Promise<UserData[] | []> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: Partial<Record<keyof UserDocument, any>> = {};
        if (ids) {
            query._id = { $in: ids };
        }

        if (email) {
            query.email = email;
        }

        const doc = await this.userModel.find(query).exec();
        return doc.map(userSchemaToResponse);
    }

    async findByEmail(email: string): Promise<UserData | null> {
        const doc = await this.userModel.findOne({ email }).exec();
        return doc ? userSchemaToResponse(doc) : null;
    }
}

