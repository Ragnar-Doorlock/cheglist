import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { UpdateUserResponseBuilder } from "./update-user.response-builder";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UpdateUserResponseData } from "../response-types/update.type";
import { PasswordHashService } from "src/password-hash-service";
import { User } from "src/entities/user/user";

@Injectable()
export class UpdateUserInteractor {
    constructor(
        private repository: UserRepository,
        private responseBuilder: UpdateUserResponseBuilder,
    ) {}

    async execute (
        id: string,
        updateUserDto: UpdateUserDto,
        requestUserId: string,
    ): Promise<UpdateUserResponseData> {
        const user = await this.repository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found.`);
        }

        if (user.id !== requestUserId) {
            throw new ForbiddenException();
        }

        let newHashedPassword;
        if (updateUserDto.password) {
            newHashedPassword = await PasswordHashService.hash(updateUserDto.password);
        }

        const updatedUser = User.create({
            id: user.id || (() => { throw new Error("User ID is undefined"); })(),
            email: updateUserDto.email ? updateUserDto.email : user.email,
            password: updateUserDto.password ? newHashedPassword : user.password,
        });
        await this.repository.save(updatedUser);

        const updatedUserFromDb = await this.repository.findById(id);
        if (!updatedUserFromDb) {
            throw new NotFoundException('Updated user not found');
        }
        if (!updatedUserFromDb.id) {
            throw new Error('Updated user ID is missing');
        }
        
        return this.responseBuilder.build(updatedUserFromDb);
    }
}
