import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChecklistDocument } from 'src/db/checklist.schema';
import { Checklist } from 'src/entities/checklist/checklist';
import { checklistEntityToSchema, checklistSchemaToResponse } from './checklist.data-converter';
import { ChecklistData } from 'src/entities/checklist/checklist.type';
import { SearchChecklistsDto } from './dto/search-checklist.dto';
import { FindOneChecklistDto } from './dto/find-one-checklist.dto';

@Injectable()
export class ChecklistRepository {
    constructor(
        @InjectModel('Checklist') private readonly checklistModel: Model<ChecklistDocument>,
    ) {}

    async findById(id: string): Promise<ChecklistData | null> {
        const doc = await this.checklistModel.findById(id).exec();
        return doc ? checklistSchemaToResponse(doc) : null;
    }

    async findOne({name, tag, projectId}: FindOneChecklistDto): Promise<ChecklistData | null> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: Partial<Record<keyof ChecklistDocument, any>> = {};
        if(name) {
            query.name = name;
        }
        if(tag) {
            query.tag = tag;
        }
        if(projectId) {
            query.projectId = projectId;
        }

        const doc = await this.checklistModel.findOne(query).exec();
        return doc ? checklistSchemaToResponse(doc) : null;
    }


    async findAll({name, tag, projectId}: SearchChecklistsDto): Promise<ChecklistData[] | []> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: Partial<Record<keyof ChecklistDocument, any>> = {};
        if(name) {
            query.name = name;
        }
        if(tag) {
            query.tag = tag;
        }
        if(projectId) {
            query.projectId = projectId;
        }

        const doc = await this.checklistModel.find(query).exec();
        return doc.map(checklistSchemaToResponse);
    }

    async save(checklist: Checklist): Promise<ChecklistData> {
        const data = checklistEntityToSchema(checklist);

        const objectId = new Types.ObjectId(checklist.getId());

        const updatedDoc = await this.checklistModel
            .findOneAndUpdate(
                { _id: objectId },
                {
                    $set: {
                        name: data.name,
                        tag: data.tag,
                        projectId: data.projectId,
                        items: data.items,
                        updatedAt: new Date(),
                    },
                    $setOnInsert: { createdAt: data.createdAt },
                },
                { upsert: true, new: true },
            )
            .exec();

        return checklistSchemaToResponse(updatedDoc);
    }

    async deleteById(id: string): Promise<void> {
        await this.checklistModel.findByIdAndDelete(id).exec();
    }

    async deleteManyByProjectId(projectId: string): Promise<void> {
        await this.checklistModel.deleteMany({ projectId }).exec();
    }

    async findIdsByProjectId(projectId: string): Promise<string[]> {
        const docs = await this.checklistModel.find({ projectId }).select('_id').exec();
        return docs.map(doc => doc._id.toString());
    }
}
