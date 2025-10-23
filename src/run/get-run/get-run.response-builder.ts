import { Injectable } from "@nestjs/common";
import { RunData } from "src/entities/run/run.type";

@Injectable()
export class GetRunResponseBuilder {
    async build(run: RunData) {
        return {
            checklistId: run.checklistId,
            tester: run.tester,
            status: run.status,
            runItems: run.runItems,
            build: run.build,
            startedAt: run.startedAt,
        };
    }
}
