import { IsOptional, IsString } from "class-validator";

export class SearchChecklistsDto {
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
