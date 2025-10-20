import { IsOptional, IsString } from "class-validator";

export class FindOneChecklistDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    projectId?: string;

    @IsOptional()
    @IsString()
    tag?: string;
}
