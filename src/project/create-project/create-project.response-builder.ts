import { Injectable } from "@nestjs/common";
import { Project } from "src/entities/project/project";

@Injectable()
export class CreateProjectResponseBuilder {
    async build(project: Project) {
        return {
            name: project.getName(),
            ownerId: project.getOwnerId(),
        };
    }
}
