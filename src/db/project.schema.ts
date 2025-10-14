import { Schema, Document, Types } from 'mongoose';

export interface ProjectDocument extends Document {
    _id: Types.ObjectId;
    name: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const ProjectSchema = new Schema<ProjectDocument>({
    name: { type: String, required: true },
    ownerId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
