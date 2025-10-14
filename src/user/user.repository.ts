import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "../db/user.schema";
import { User } from "src/entities/user/user";
import { UserData } from "src/entities/user/user.type";
import { userSchemaToResponse } from "./user.data-converter";
import { SearchUsersDto } from "./dto/search-users.dto";
import { ObjectId } from 'mongodb';
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async save(user: User): Promise<UserData> {
        const id = new ObjectId(user.getId());

        const doc = await this.userModel.findOneAndUpdate(
            { _id: id },
            {
                 _id: id,
                email: user.getEmail(),
                password: user.getPassword(),
                createdAt: user.getCreatedAt(),
                updatedAt: new Date(),
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        ).exec();

        if (!doc) {
            throw new Error('Failed to save user');
        }

        return userSchemaToResponse(doc);
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

