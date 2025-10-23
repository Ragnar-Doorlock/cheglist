import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateRunDto {
    @IsMongoId()
    checklistId: string;

    @IsOptional()
    @IsString()
    tester?: string;

    @IsOptional()
    @IsString()
    build?: string;
}
