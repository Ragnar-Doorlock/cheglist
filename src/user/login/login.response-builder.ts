import { Injectable } from "@nestjs/common";

@Injectable()
export class LoginResponseBuilder {
    async build(token: string): Promise<{access_token: string}> {
        return { access_token: token };
    }
}
