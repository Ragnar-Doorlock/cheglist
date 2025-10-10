import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { LoginResponseBuilder } from "./login.response-builder";
import { LoginDto } from "../dto/login.dto";
import { PasswordHashService } from "src/password-hash-service";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LoginInteractor {
    constructor(
        private userRepository: UserRepository,
        private responseBuilder: LoginResponseBuilder,
        private authService: AuthService,
    ) {}

    async execute(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.userRepository.findByEmail(loginDto.email);
        if (!user) {
            throw new BadRequestException('User does not exist.');
        }

        const match = await PasswordHashService.compare(loginDto.password, (await user).password);
        if (!match) {
            throw new BadRequestException('Invalid password.');
        }

        if (!user.id) {
            throw new BadRequestException('User ID is undefined.');
        }
        const token = await this.authService.sign({id: user.id});
        return this.responseBuilder.build(token);
    }
}
