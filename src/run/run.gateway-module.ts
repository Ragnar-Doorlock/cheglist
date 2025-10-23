import { MongooseModule } from "@nestjs/mongoose";
import { RunSchema } from "src/db/run.schema";
import { RunRepository } from "./run.repository";
import { Module } from "@nestjs/common";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Run', schema: RunSchema }])],
    providers: [RunRepository],
    exports: [RunRepository],
})
export class RunGatewayModule {}
