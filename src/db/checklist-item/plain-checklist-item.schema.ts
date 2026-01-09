import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ChecklistItemBase } from "./checklist-item-base.schema";

@Schema({ _id: false })
export class ChecklistPlainItem extends ChecklistItemBase {
    @Prop({ required: true })
    title: string;
}

export const ChecklistPlainItemSchema = SchemaFactory.createForClass(ChecklistPlainItem);
