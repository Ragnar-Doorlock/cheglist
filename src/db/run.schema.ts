import { Schema, Document, Types } from 'mongoose';
import { RunItemStatus, runItemStatus } from 'src/run-item/runItemStatus';

export interface RunItemSchema {
    _id: Types.ObjectId;
    checklistItemId: Types.ObjectId;
    title: string;
    tag?: string;
    status: RunItemStatus;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RunDocument extends Document {
    _id: Types.ObjectId;
    checklistId: Types.ObjectId;
    tester?: string;
    status: string;
    runItems: RunItemSchema[];
    startedAt: Date;
    build?: string;
    createdAt: Date;
    updatedAt: Date;
}

export const RunItemSubSchema = new Schema<RunItemSchema>({
    checklistItemId: { type: Schema.Types.ObjectId, ref: 'ChecklistItem', required: true },
    title: { type: String, required: true },
    tag: { type: String },
    status: { type: String, required: true, default: runItemStatus.NOT_RUN },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const RunSchema = new Schema<RunDocument>({
    checklistId: { type: Schema.Types.ObjectId, ref: 'Checklist', required: true },
    tester: { type: String },
    status: { type: String, required: true, default: 'in_progress' },
    runItems: { type: [RunItemSubSchema], default: [] },
    startedAt: { type: Date, default: Date.now },
    build: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
