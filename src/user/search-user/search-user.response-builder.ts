import { Injectable } from "@nestjs/common";
import { UserData } from "src/entities/user/user.type";

@Injectable()
export class SearchUserResponseBuilder {
    async build(users: UserData[]) {
        return users.map((x) => ({
            id: x.id!, // '!' not sure but it may be a fix. If i search for user and he exists in db, he will have id
            email: x.email,
        }))
    }
}
