import { Module } from "@nestjs/common";
import { ChannelsController } from "./channels.controller";
import { ChannelsService } from "./channels.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthoritiesModule } from "../authorities/authorities.module";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService],
  imports: [AuthoritiesModule, PrismaModule, UsersModule],
})
export class ChannelsModule {}
