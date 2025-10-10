import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
    providers: [JwtService, AuthService],
    exports: [JwtService, AuthService],
})
export class AuthModule {}
