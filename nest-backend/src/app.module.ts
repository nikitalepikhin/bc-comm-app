import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RefreshTokensModule } from "./refresh-tokens/refresh-tokens.module";
import { CookieModule } from './cookie/cookie.module';
import { TestModule } from './test/test.module';
import { SchoolsModule } from './schools/schools.module';
import { AuthoritiesModule } from './authorities/authorities.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, RefreshTokensModule, CookieModule, TestModule, SchoolsModule, AuthoritiesModule],
})
export class AppModule {}
