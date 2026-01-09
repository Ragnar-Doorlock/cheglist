import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { checklistItemView } from "../../entities/checklist-item/checklist-item-view";
import type { ChecklistItemView } from "../../entities/checklist-item/checklist-item-view";

@Schema({ _id: false, discriminatorKey: 'type' })
export class ChecklistItemBase {
    @Prop({ required: true, enum: checklistItemView })
    type: ChecklistItemView;

    @Prop({ required: true })
    order: number;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const ChecklistItemSchema = SchemaFactory.createForClass(ChecklistItemBase);
