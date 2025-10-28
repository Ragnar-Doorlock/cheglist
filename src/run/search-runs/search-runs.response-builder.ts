import { Injectable } from "@nestjs/common";
import { RunData } from "src/entities/run/run.type";

@Injectable()
export class SearchRunsResponseBuilder {
    async build(runs: RunData[]) {
        return runs.map(run => ({
            id: run.id,
            checklistId: run.checklistId,
            tester: run.tester,
            status: run.status,
            build: run.build,
            startedAt: run.startedAt,
            runItems: run.runItems,
        }));
    }
}
