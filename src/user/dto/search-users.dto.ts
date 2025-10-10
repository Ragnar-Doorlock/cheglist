import { IsArray, IsEmail, IsOptional, IsString } from "class-validator";

export class SearchUsersDto {
    @IsOptional()
    @IsString({ each: true })
    @IsArray()
    ids?: string[];

    @IsOptional()
    @IsEmail()
    @IsString()
    email?: string;
}