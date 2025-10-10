import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterUserResponseBuilder } from "./register-user.response-builder";
import { UserRepository } from "../user.repository";
import { AuthService } from "src/auth/auth.service";
import { RegisterUserDto } from "../dto/register-user.dto";
import { PasswordHashService } from "src/password-hash-service";
import { User } from "src/entities/user/user";

@Injectable()
export class RegisterUserInteractor {
    constructor(
        private authService: AuthService,
        private responseBuilder: RegisterUserResponseBuilder,
        private repository: UserRepository,
    ) {}
    async execute(registerUserDto: RegisterUserDto): Promise<{access_token: string}> {
        const user = await this.repository.findByEmail(registerUserDto.email);
        if (user) {
            throw new BadRequestException('User with this email already exists.');
        }

        const hashedPassword = await PasswordHashService.hash(registerUserDto.password);
        const userEntity = User.create({
            email: registerUserDto.email,
            password: hashedPassword,
        });

        await this.repository.save(userEntity);
        
        const registeredUser = await this.repository.findByEmail(registerUserDto.email);
        if (!registeredUser) {
            throw new BadRequestException('Failed to retrieve the registered user.');
        }
        if (!registeredUser.id) {
            throw new BadRequestException('Registered user ID is undefined.');
        }
        const token = await this.authService.sign({ id: registeredUser.id });
        return this.responseBuilder.build(token);
    }
}
