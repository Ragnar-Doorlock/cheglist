import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ChecklistPlainItem, ChecklistPlainItemSchema } from "./plain-checklist-item.schema";
import { ChecklistItemBase } from "./checklist-item-base.schema";

@Schema({ _id: false })
export class ChecklistGroupItem extends ChecklistItemBase {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [ChecklistPlainItemSchema], default: [] })
  items: ChecklistPlainItem[];
}

export const ChecklistGroupItemSchema = SchemaFactory.createForClass(ChecklistGroupItem);
