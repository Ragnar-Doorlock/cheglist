import { ProjectDocument } from "src/db/project.schema";
import { Project } from "src/entities/project/project";
import { ProjectData } from "src/entities/project/project.type";

export function projectSchemaToEntity(doc: ProjectDocument): Project {
    return Project.create({
        id: doc._id.toString(),
        name: doc.name,
        ownerId: doc.ownerId,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    });
}

export function projectEntityToSchema(project: Project): ProjectData {
    return {
        id: project.getId(),
        name: project.getName(),
        ownerId: project.getOwnerId(),
        createdAt: project.getCreatedAt(),
        updatedAt: project.getUpdatedAt(),
    };
}

export function projectSchemaToResponse(doc: ProjectDocument): ProjectData {
    return {
        id: doc._id.toString(),
        name: doc.name,
        ownerId: doc.ownerId,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
