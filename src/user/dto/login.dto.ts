import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
        @IsNotEmpty()
        @IsString()
        @MinLength(6)
        @MaxLength(20)
        password: string;
    
        @IsNotEmpty()
        @IsEmail()
        @MinLength(6)
        @MaxLength(40)
        @IsString()
        email: string;
} 