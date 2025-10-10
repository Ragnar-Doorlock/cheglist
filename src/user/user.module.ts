import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { RegisterUserInteractor } from "./register-user/register-user.interactor";
import { RegisterUserResponseBuilder } from "./register-user/register-user.response-builder";
import { UserGatewayModule } from "./user.gateway-module";
import { LoginInteractor } from "./login/login.interactor";
import { LoginResponseBuilder } from "./login/login.response-builder";
import { GetUserInteractor } from "./get-user/get-user.interactor";
import { GetUserResponseBuilder } from "./get-user/get-user.response-builder";
import { SearchUserResponseBuilder } from "./search-user/search-user.response-builder";
import { SearchUserInteractor } from "./search-user/search-user.interactor";
import { UpdateUserInteractor } from "./update-user/update-user.interactor";
import { UpdateUserResponseBuilder } from "./update-user/update-user.response-builder";

@Module({
    imports: [ConfigModule, UserGatewayModule, AuthModule],
    controllers: [UserController],
    providers: [
        UserService,
        RegisterUserInteractor,
        RegisterUserResponseBuilder,
        LoginInteractor,
        LoginResponseBuilder,
        GetUserInteractor,
        GetUserResponseBuilder,
        SearchUserResponseBuilder,
        SearchUserInteractor,
        SearchUserResponseBuilder,
        UpdateUserInteractor,
        UpdateUserResponseBuilder,
    ],
})
export class UserModule {}
