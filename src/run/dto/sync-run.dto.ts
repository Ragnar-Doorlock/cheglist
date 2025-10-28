import { IsMongoId } from "class-validator";

export class SyncDto {
    @IsMongoId()
    id: string;
}
