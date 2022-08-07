import { Module } from "@nestjs/common";
import { FacultiesController } from "./faculties.controller";
import { FacultiesService } from "./faculties.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthoritiesModule } from "../authorities/authorities.module";

@Module({
  controllers: [FacultiesController],
  providers: [FacultiesService],
  imports: [PrismaModule, AuthoritiesModule],
})
export class FacultiesModule {}
