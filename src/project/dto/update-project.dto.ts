import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateProjectDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    name: string;
}
