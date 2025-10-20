import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChecklistSchema } from "src/db/checklist.schema";
import { ChecklistRepository } from "./checklist.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Checklist', schema: ChecklistSchema}])],
    providers: [ChecklistRepository],
    exports: [ChecklistRepository],
})
export class ChecklistGatewayModule {}
