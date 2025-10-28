import { Injectable } from "@nestjs/common";
import { UserData } from "src/entities/user/user.type";

@Injectable()
export class SearchUserResponseBuilder {
    async build(users: UserData[]) {
        return users.map((x) => ({
            id: x.id,
            email: x.email,
        }))
    }
}
