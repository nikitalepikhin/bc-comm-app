import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { RefreshTokensModule } from "../refresh-tokens/refresh-tokens.module";
import { JwtModule } from "@nestjs/jwt";
import { CookieModule } from "../cookie/cookie.module";
import { JwtStrategy } from "./jwt.strategy";
import { JwtRefreshStrategy } from "./jwt-refresh.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    RefreshTokensModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    CookieModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
