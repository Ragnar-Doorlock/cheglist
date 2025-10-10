import { Schema, Document, Types } from 'mongoose';

export interface UserDocument extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export const UserSchema = new Schema<UserDocument>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
