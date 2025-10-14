import { Injectable } from "@nestjs/common";
import { ProjectData } from "src/entities/project/project.type";

@Injectable()
export class GetProjectResponseBuilder {
    async build(project: ProjectData) {
        return {
            name: project.name,
            ownerId: project.ownerId,
        }
    }
}
