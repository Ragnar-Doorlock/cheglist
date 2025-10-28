import { Injectable } from "@nestjs/common";
import { CreateRunResponseData } from "../response-types/create-run.type";
import { Run } from "src/entities/run/run";

@Injectable()
export class CreateRunResponseBuilder {
    async build(run: Run): Promise<CreateRunResponseData> {
        return {
            checklistId: run.getChecklistId(),
            tester: run.getTester(),
            status: run.getStatus(),
            startedAt: run.getStartedAt(),
            build: run.getBuild(),
            runItems: run.getRunItems(),
        };
    }
}
