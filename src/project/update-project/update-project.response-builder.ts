import { Injectable } from "@nestjs/common";
import { ProjectData } from "src/entities/project/project.type";

@Injectable()
export class UpdateProjectResponseBuilder {
    async build (project: ProjectData) {
        return {
            id: project.id,
            name: project.name,
            ownerId: project.ownerId,
        };
    }
}
