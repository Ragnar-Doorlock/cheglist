import { Injectable } from "@nestjs/common";
import { RunItem } from "src/entities/run-item-result/run-item";
import { RunData } from "src/entities/run/run.type";

@Injectable()
export class UpdateRunItemResponseBuilder {
    async build(run: RunData) {
        return {
            id: run.id,
            checklistId: run.checklistId,
            order: run.order,
            tester: run.tester,
            status: run.status,
            build: run.build,
            startedAt: run.startedAt,
            runItems: (run.runItems ?? []).map(item => new RunItem(item)),
        };
    }
}
