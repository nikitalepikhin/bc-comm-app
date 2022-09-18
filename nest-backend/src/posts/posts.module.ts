import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { AuthoritiesModule } from "../authorities/authorities.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [AuthoritiesModule, PrismaModule],
})
export class PostsModule {}
