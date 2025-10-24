import { Run } from 'src/entities/run/run';
import { RunDocument } from 'src/db/run.schema';
import { RunData } from 'src/entities/run/run.type';
import { RunItem } from 'src/entities/run-item-result/run-item';
import { RunStatus } from './runStatus';

export function runSchemaToEntity(doc: RunDocument): Run {
    const data: RunData = {
        id: doc._id.toString(),
        checklistId: doc.checklistId.toString(),
        order: doc.order,
        tester: doc.tester,
        status: doc.status as RunStatus,
        build: doc.build,
        startedAt: doc.startedAt,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        runItems: doc.runItems.map(item => ({
            id: item._id.toString(),
            checklistItemId: item.checklistItemId.toString(),
            tag: item.tag,
            title: item.title,
            status: item.status,
            order: item.order,
            comment: item.comment,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        })),
    };

    return Run.create(data);
}

export function runEntityToSchema(entity: Run): Record<string, unknown> {
    return {
        _id: entity.getId(),
        checklistId: entity.getChecklistId(),
        tester: entity.getTester(),
        order: entity.getOrder(),
        status: entity.getStatus(),
        build: entity.getBuild(),
        startedAt: entity.getStartedAt(),
        createdAt: entity.getCreatedAt(),
        updatedAt: entity.getUpdatedAt(),
        runItems: entity.getRunItems().map((item: RunItem) => ({
            _id: item.getId(),
            checklistItemId: item.getChecklistItemId(),
            tag: item.getTag(),
            title: item.getTitle(),
            status: item.getStatus(),
            order: item.getOrder(),
            comment: item.getComment(),
            createdAt: item.getCreatedAt(),
            updatedAt: item.getUpdatedAt(),
        })),
    };
}

export function runSchemaToResponse(doc: RunDocument) {
    return {
        id: doc._id.toString(),
        checklistId: doc.checklistId.toString(),
        order: doc.order,
        tester: doc.tester,
        status: doc.status as RunStatus,
        build: doc.build,
        startedAt: doc.startedAt,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        runItems: doc.runItems.map(item => ({
            id: item._id.toString(),
            checklistItemId: item.checklistItemId.toString(),
            tag: item.tag,
            title: item.title,
            order: item.order,
            status: item.status,
            comment: item.comment,
        })),
    };
}
