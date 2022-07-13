import { Module } from "@nestjs/common";
import { SchoolsController } from "./schools.controller";
import { SchoolsService } from "./schools.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { AuthoritiesModule } from "../authorities/authorities.module";

@Module({
  controllers: [SchoolsController],
  providers: [SchoolsService],
  imports: [AuthModule, PrismaModule, UsersModule, AuthoritiesModule],
})
export class SchoolsModule {}
