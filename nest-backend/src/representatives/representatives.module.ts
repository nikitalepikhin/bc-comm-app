import { Module } from "@nestjs/common";
import { RepresentativesController } from "./representatives.controller";
import { RepresentativesService } from "./representatives.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthoritiesModule } from "../authorities/authorities.module";

@Module({
  controllers: [RepresentativesController],
  providers: [RepresentativesService],
  imports: [PrismaModule, AuthoritiesModule],
})
export class RepresentativesModule {}
