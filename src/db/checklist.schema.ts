import { Schema, Document, Types } from 'mongoose';

export interface ChecklistItemSchema {
    _id: Types.ObjectId;
    title: string;
    order: number;
    tag?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ChecklistDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  tag?: string;
  projectId: Types.ObjectId;
  items: ChecklistItemSchema[];
  createdAt: Date;
  updatedAt: Date;
}

export const ChecklistItemSubSchema = new Schema<ChecklistItemSchema>({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  tag: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ChecklistSchema = new Schema<ChecklistDocument>({
  name: { type: String, required: true },
  tag: { type: String },
  description: { type: String },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  items: { type: [ChecklistItemSubSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
