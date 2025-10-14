import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user/user";
import { UserData } from "src/entities/user/user.type";

@Injectable()
export class UpdateUserResponseBuilder {
    async build(entity: UserData) {
        return {
            id: entity.id,
            email: entity.email,
        }
    }
}
