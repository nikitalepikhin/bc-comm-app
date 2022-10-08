import { Module } from "@nestjs/common";
import { FeedController } from "./feed.controller";
import { FeedService } from "./feed.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthoritiesModule } from "../authorities/authorities.module";

@Module({
  controllers: [FeedController],
  providers: [FeedService],
  imports: [PrismaModule, AuthoritiesModule],
})
export class FeedModule {}
