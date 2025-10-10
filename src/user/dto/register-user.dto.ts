import {IsNotEmpty, MinLength, MaxLength, IsString, IsEmail} from 'class-validator';

export class RegisterUserDto {
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
