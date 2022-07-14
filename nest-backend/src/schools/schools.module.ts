import { Module } from "@nestjs/common";
import { SchoolsController } from "./schools.controller";
import { SchoolsService } from "./schools.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthoritiesModule } from "../authorities/authorities.module";

@Module({
  controllers: [SchoolsController],
  providers: [SchoolsService],
  imports: [PrismaModule, AuthoritiesModule],
  exports: [SchoolsService],
})
export class SchoolsModule {}
