import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateChecklistDto {
    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(200)
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    tag?: string;
}
