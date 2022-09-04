import { Module } from "@nestjs/common";
import { TeachersController } from "./teachers.controller";
import { TeachersService } from "./teachers.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthoritiesModule } from "../authorities/authorities.module";

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [PrismaModule, AuthoritiesModule],
})
export class TeachersModule {}
