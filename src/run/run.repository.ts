import { Injectable } from "@nestjs/common";
import { RunDocument } from "src/db/run.schema";
import { Model, Types } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { RunData } from "src/entities/run/run.type";
import { runEntityToSchema, runSchemaToResponse } from "./run.data-converter";
import { Run } from "src/entities/run/run";

@Injectable()
export class RunRepository {
    constructor(
        @InjectModel('Run')
        private readonly runModel: Model<RunDocument>,
    ) {}

    async findById(id: string): Promise<RunData | null> {
        const doc = await this.runModel.findById(id).exec();
        return doc ? runSchemaToResponse(doc) : null;
    }

    async findByChecklistId(checklistId: string): Promise<RunData[] | []> {
        const docs = await this.runModel.find({ checklistId }).exec();
        return docs.map(runSchemaToResponse);
    }

    async findLastByChecklistId(checklistId: string): Promise<RunData | null> {
        const doc = await this.runModel
            .findOne({ checklistId })
            .sort({ order: -1 })
            .exec();

        return doc ? runSchemaToResponse(doc) : null;
    }

    async save(run: Run): Promise<RunData> {
        const data = runEntityToSchema(run);

        const objectId = new Types.ObjectId(run.getId());

        const updatedDoc = await this.runModel
            .findOneAndUpdate(
                { _id: objectId },
                {
                    $set: {
                        tester: data.tester,
                        build: data.build,
                        status: data.status,
                        runItems: data.runItems,
                        updatedAt: new Date(),
                    },
                    $setOnInsert: {
                        checklistId: data.checklistId,
                        startedAt: data.startedAt,
                        createdAt: data.startedAt,
                    },
                },
                { upsert: true, new: true },
            )
            .exec();

        return runSchemaToResponse(updatedDoc);
    }

    async deleteById(id: string): Promise<void> {
        await this.runModel.findByIdAndDelete(id).exec();
    }

    async deleteManyByChecklistIds(checklistIds: string[]): Promise<void> {
        await this.runModel.deleteMany({ checklistId: { $in: checklistIds } }).exec();
    }

    async deleteManyByProjectId(projectId: string): Promise<void> {
        const checklistIds = await this.runModel
            .distinct('checklistId', { projectId })
            .exec();
        if (checklistIds.length > 0) {
            await this.runModel.deleteMany({ checklistId: { $in: checklistIds } }).exec();
        }
    }
}
