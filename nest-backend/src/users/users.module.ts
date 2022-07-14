import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaModule } from "../prisma/prisma.module";
import { SchoolsModule } from "../schools/schools.module";

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [PrismaModule, SchoolsModule],
})
export class UsersModule {}
