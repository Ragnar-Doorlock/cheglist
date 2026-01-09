import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { checklistItemView } from '../entities/checklist-item/checklist-item-view';
import { ChecklistPlainItem, ChecklistPlainItemSchema } from './checklist-item/plain-checklist-item.schema';
import { ChecklistGroupItem, ChecklistGroupItemSchema } from './checklist-item/group-checklist-item.schema';
import { ChecklistItemSchema } from './checklist-item/checklist-item-base.schema';

@Schema({ _id: false, timestamps: true })
export class ChecklistDocument {
    @Prop({ type: Types.ObjectId, required: true })
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop()
    tag?: string;

    @Prop({ type: Number, required: true })
    order: number;

    @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
    projectId: Types.ObjectId;

    @Prop({ type: [ChecklistItemSchema], default: [] })
    items: (ChecklistPlainItem | ChecklistGroupItem)[];

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const ChecklistSchema = SchemaFactory.createForClass(ChecklistDocument);
ChecklistItemSchema.discriminator(
    checklistItemView.PLAIN,
    ChecklistPlainItemSchema,
);
ChecklistItemSchema.discriminator(
    checklistItemView.GROUP,
    ChecklistGroupItemSchema,
);