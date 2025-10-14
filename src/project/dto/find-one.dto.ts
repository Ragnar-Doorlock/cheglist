import { IsOptional, IsString } from "class-validator";

export class FindOneProjectDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    ownerId?: string;
}
