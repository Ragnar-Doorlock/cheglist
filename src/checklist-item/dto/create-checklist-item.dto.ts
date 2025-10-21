import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateChecklistItemDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(300)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    tag?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    order?: number;
}