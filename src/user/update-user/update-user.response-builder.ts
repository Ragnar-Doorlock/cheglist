import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user/user";

@Injectable()
export class UpdateUserResponseBuilder {
    async build(entity: User) {
        return {
            id: entity.getId()!, // here we go again, i dunno how to fix TS in any other way
            email: entity.getEmail(),
        }
    }
}
