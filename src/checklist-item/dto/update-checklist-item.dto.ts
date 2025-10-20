import { IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class UpdateChecklistItemDto {
    @IsString()
    @IsOptional()
    @MinLength(1)
    @MaxLength(300)
    title?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    order?: number;
}
