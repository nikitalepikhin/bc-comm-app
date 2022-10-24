import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaModule } from "../prisma/prisma.module";
import { SchoolsModule } from "../schools/schools.module";
import { UsersController } from "./users.controller";
import { AuthoritiesModule } from "../authorities/authorities.module";
import { FacultiesModule } from "../faculties/faculties.module";
import { ChannelsModule } from "../channels/channels.module";
import { PostsModule } from "../posts/posts.module";
import { CommentsModule } from "../comments/comments.module";

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    PrismaModule,
    SchoolsModule,
    FacultiesModule,
    AuthoritiesModule,
    forwardRef(() => ChannelsModule),
    forwardRef(() => PostsModule),
    forwardRef(() => CommentsModule),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
