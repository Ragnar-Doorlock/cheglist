import { Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { GetUserResponseBuilder } from "./get-user.response-builder";
import { GetUserResponseData } from "../response-types/get-user.type";

@Injectable()
export class GetUserInteractor {
    constructor(
        private repository: UserRepository,
        private responseBuilder: GetUserResponseBuilder,
    ) {}

    async execute(id: string): Promise<GetUserResponseData | null> {
        const user = await this.repository.findById(id);
        if (!user) {
            return null;
        }
        return this.responseBuilder.build(user);
    }
}
