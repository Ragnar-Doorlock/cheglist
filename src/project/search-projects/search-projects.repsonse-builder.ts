import { Injectable } from "@nestjs/common";
import { ProjectData } from "src/entities/project/project.type";

@Injectable()
export class SearchProjectsResponseBuilder {
    async build(projects: ProjectData[]) {
        return projects.map((x) => ({
            id: x.id!,
            name: x.name,
            ownerId: x.ownerId,
        }));
    }
}
