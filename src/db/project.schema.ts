import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ _id: false, timestamps: true })
export class ProjectDocument {
    @Prop({ type: Types.ObjectId, required: true })
    _id: Types.ObjectId;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    ownerId: Types.ObjectId;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectDocument);
