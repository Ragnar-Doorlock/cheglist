import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    @IsString()
    name: string;

    /* @IsNotEmpty()
    @IsString()
    ownerId: string; */
}
