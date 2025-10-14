import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { RegisterUserInteractor } from "./register-user/register-user.interactor";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginInteractor } from "./login/login.interactor";
import { LoginDto } from "./dto/login.dto";
import { GetUserResponseData } from "./response-types/get-user.type";
import { GetUserInteractor } from "./get-user/get-user.interactor";
import { SearchUserInteractor } from "./search-user/search-user.interactor";
import { SearchUsersDto } from "./dto/search-users.dto";
import { SearchUserResponseData } from "./response-types/search-user.type";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateUserInteractor } from "./update-user/update-user.interactor";

@Injectable()
export class UserService {
    constructor(
        private registerInteractor: RegisterUserInteractor,
        private loginInteractor: LoginInteractor,
        private getUserInteractor: GetUserInteractor,
        private searchUserInteractor: SearchUserInteractor,
        private updateUserInteractor: UpdateUserInteractor,
    ) {}

    async registerUser(registerUserDto: RegisterUserDto): Promise<{access_token: string}> {
        try {
            return this.registerInteractor.execute(registerUserDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    async login(loginDto: LoginDto): Promise<{access_token: string}> {
        try {
            return this.loginInteractor.execute(loginDto)
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    async getUser(id: string): Promise<GetUserResponseData | null> {
        try {
            return this.getUserInteractor.execute(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw new InternalServerErrorException();
        }
    }

    async searchUser(searchUsersDto: SearchUsersDto): Promise<SearchUserResponseData[] | []> {
        try {
            return this.searchUserInteractor.execute(searchUsersDto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto, requestUserId: string) {
        try {
            return this.updateUserInteractor.execute(id, updateUserDto, requestUserId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            if (error instanceof ForbiddenException) {
                throw new ForbiddenException();
            }
            throw new InternalServerErrorException();
        }
    }
}
