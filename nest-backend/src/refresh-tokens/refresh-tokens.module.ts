import { Module } from "@nestjs/common";
import { RefreshTokensService } from "./refresh-tokens.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  providers: [RefreshTokensService],
  exports: [RefreshTokensService],
  imports: [PrismaModule],
})
export class RefreshTokensModule {}
