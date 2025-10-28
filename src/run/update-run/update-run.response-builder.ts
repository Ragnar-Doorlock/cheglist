import { Injectable } from "@nestjs/common";
import { RunData } from "src/entities/run/run.type";

@Injectable()
export class UpdateRunResponseBuilder {
    async build(run: RunData) {
        return {
            id: run.id,
            checklistId: run.checklistId,
            tester: run.tester,
            status: run.status,
            startedAt: run.startedAt,
            build: run.build,
        };
    }
}
