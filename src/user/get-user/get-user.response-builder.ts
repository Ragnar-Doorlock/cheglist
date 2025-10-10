import { Injectable } from "@nestjs/common";
import { UserData } from "src/entities/user/user.type";
import { GetUserResponseData } from "../response-types/get-user.type";

@Injectable()
export class GetUserResponseBuilder {
    async build(user: UserData): Promise<GetUserResponseData> {
        return {
            email: user.email,
        }
    }
}
