import { IsArray, IsOptional, IsString } from "class-validator";

export class SearchProjectsDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    ids?: string[];

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    ownerId?: string;
}
