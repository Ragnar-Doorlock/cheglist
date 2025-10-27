import { Injectable } from "@nestjs/common";
import { Project } from "src/entities/project/project";

@Injectable()
export class CreateProjectResponseBuilder {
    async build(project: Project) {
        return {
            //TODO: return ID
            name: project.getName(),
            ownerId: project.getOwnerId(),
        };
    }
}
