import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { DbConnectionModule } from './db/db-connection.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
            envFilePath: '.development.env',
            isGlobal: true,
        }),
        UserModule,
        ProjectModule,
        DbConnectionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
  ],
})
export class AppModule {}
