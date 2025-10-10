import { Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { SearchUserResponseBuilder } from "./search-user.response-builder";
import { SearchUsersDto } from "../dto/search-users.dto";
import { SearchUserResponseData } from "../response-types/search-user.type";

@Injectable()
export class SearchUserInteractor {
    constructor (
        private repository: UserRepository,
        private responseBuilder: SearchUserResponseBuilder,
    ) {}

    async execute(searchUsersDto: SearchUsersDto): Promise<SearchUserResponseData[] | []> {
        const users = await this.repository.findAll(searchUsersDto);
        return this.responseBuilder.build(users);
    }
}
