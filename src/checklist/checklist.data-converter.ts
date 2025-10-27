import { ChecklistDocument } from 'src/db/checklist.schema';
import { Checklist } from 'src/entities/checklist/checklist';
import { ChecklistItem } from 'src/entities/checklist-item/checklist-item';
import { ChecklistData } from 'src/entities/checklist/checklist.type';

export function checklistSchemaToEntity(doc: ChecklistDocument): Checklist {
    const data: ChecklistData = {
        id: doc._id.toString(),
        name: doc.name,
        projectId: doc.projectId.toString(),
        tag: doc.tag,
        items: doc.items.map((item) => ({
            id: item._id.toString(),
            title: item.title,
            order: item.order,
            tag: item.tag,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        })),
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };

    return Checklist.create(data);
}

export function checklistEntityToSchema(entity: Checklist): Record<string, unknown> {
    return {
        _id: entity.getId(),
        name: entity.getName(),
        projectId: entity.getProjectId(),
        tag: entity.getTag(),
        items: entity.getItems().map((item: ChecklistItem) => ({
            _id: item.getId(),
            title: item.getTitle(),
            order: item.getOrder(),
            tag: item.getTag(),
            createdAt: item.getCreatedAt(),
            updatedAt: item.getUpdatedAt(),
        })),
        createdAt: entity.getCreatedAt(),
        updatedAt: entity.getUpdatedAt(),
    };
}

export function checklistSchemaToResponse(doc: ChecklistDocument): ChecklistData {
    return {
        id: doc._id.toString(),
        name: doc.name,
        tag: doc.tag,
        projectId: doc.projectId.toString(),
        items: doc.items.map((item) => ({
            id: item._id.toString(),
            title: item.title,
            order: item.order,
            tag: item.tag,
        })),
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
