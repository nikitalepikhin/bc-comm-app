import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local/local.strategy";
import { RefreshTokensModule } from "../refresh-tokens/refresh-tokens.module";
import { JwtModule } from "@nestjs/jwt";
import { CookieModule } from "../cookie/cookie.module";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { JwtRefreshStrategy } from "./jwt-refresh/jwt-refresh.strategy";
import { AuthoritiesModule } from "../authorities/authorities.module";
import { LocalAuthGuard } from "./local/local-auth.guard";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { JwtRefreshAuthGuard } from "./jwt-refresh/jwt-refresh-auth.guard";
import { RequirePermissionsGuard } from "./require-permissions/require-permissions.guard";
import { IsVerifiedGuard } from "./verification/is-verified.guard";
import { BasicStrat } from "./basic/basic.strategy";
import { BasicAuthGuard } from "./basic/basic-auth.guard";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    RefreshTokensModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    CookieModule,
    AuthoritiesModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    BasicStrat,
    LocalAuthGuard,
    JwtAuthGuard,
    JwtRefreshAuthGuard,
    BasicAuthGuard,
    IsVerifiedGuard,
    RequirePermissionsGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
