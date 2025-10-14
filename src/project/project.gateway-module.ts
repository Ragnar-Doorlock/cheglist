import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectSchema } from "src/db/project.schema";
import { ProjectRepository } from "./project.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema}])],
    providers: [ProjectRepository],
    exports: [ProjectRepository],
})
export class ProjectGatewayModule {}
