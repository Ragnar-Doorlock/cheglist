import {MinLength, MaxLength, IsOptional, IsString, IsEmail} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password?: string;

    @IsEmail()
    @MinLength(6)
    @MaxLength(40)
    @IsString()
    @IsOptional()
    email?: string;
}
