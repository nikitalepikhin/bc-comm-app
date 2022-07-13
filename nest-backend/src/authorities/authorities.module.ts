import { Module } from "@nestjs/common";
import { AuthoritiesService } from "./authorities.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  providers: [AuthoritiesService],
  imports: [PrismaModule],
  exports: [AuthoritiesService],
})
export class AuthoritiesModule {}
