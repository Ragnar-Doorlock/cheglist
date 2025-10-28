import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProjectDocument } from "src/db/project.schema";
import { Project } from "src/entities/project/project";
import { ProjectData } from "src/entities/project/project.type";
import { projectEntityToSchema, projectSchemaToResponse } from "./project.data-converter";
import { SearchProjectsDto } from "./dto/search-projects.dto";
import { FindOneProjectDto } from "./dto/find-one.dto";
import { Injectable } from "@nestjs/common";
import { ObjectId } from 'mongodb';

@Injectable()
export class ProjectRepository {
    constructor(@InjectModel('Project') private projectModel: Model<ProjectDocument>) {}

    async save(project: Project): Promise<ProjectData> {
        const generatedObjectId = new ObjectId(project.getId());
        const data = projectEntityToSchema(project);

        const doc = await this.projectModel.findOneAndUpdate(
            { _id: generatedObjectId },
            {
                 _id: generatedObjectId,
                name: data.name,
                ownerId: data.ownerId,
                createdAt: data.createdAt,
                updatedAt: new Date(),
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        ).exec();

        if (!doc) {
            throw new Error('Failed to save user');
        }

        return projectSchemaToResponse(doc);
    }

    async findById(id: string): Promise<ProjectData | null> {
        const doc = await this.projectModel.findById(id).exec();
        return doc ? projectSchemaToResponse(doc) : null;
    }

    async findOne({id, ownerId, name}: FindOneProjectDto): Promise<ProjectData | null> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: Partial<Record<keyof ProjectDocument, any>> = {};

        if (id) {
            query._id = id;
        }
        if (ownerId) {
            query.ownerId = ownerId;
        }
        if (name) {
            query.name = name;
        }

        const doc = await this.projectModel.findOne(query).exec();

        return doc ? projectSchemaToResponse(doc) : null;
    }

    async findAll({ids, ownerId, name}: SearchProjectsDto): Promise<ProjectData[] | []> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: Partial<Record<keyof ProjectDocument, any>> = {};

        if (ids) {
            query._id = { $in: ids };
        }
        if (ownerId) {
            query.ownerId = ownerId;
        }
        if (name) {
            query.name = name;
        }

        const doc = await this.projectModel.find(query).exec();
        return doc.map(projectSchemaToResponse);
    }

    async deleteById(id: string): Promise<void> {
        await this.projectModel.findByIdAndDelete(id).exec();
    }
}
