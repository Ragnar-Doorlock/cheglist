import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { Public } from "src/public.decorator";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginDto } from "./dto/login.dto";
import { SearchUsersDto } from "./dto/search-users.dto";
import { TokenDataDecorator } from "src/token-data.decorator";
import type { TokenData } from "src/token-data.type";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Public()
    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.service.registerUser(registerUserDto);
    }

    @Public()
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.service.login(loginDto);
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.service.getUser(id);
    }

    @Post('search')
    searchUser(@Body() searchUsersDto: SearchUsersDto) {
        return this.service.searchUser(searchUsersDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @TokenDataDecorator() tokenData: TokenData) {
        const requestUserId = tokenData.id;
        return this.service.update(id, updateUserDto, requestUserId);
    }
}
