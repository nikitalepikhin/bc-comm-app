import { forwardRef, Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { AuthoritiesModule } from "../authorities/authorities.module";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [AuthoritiesModule, PrismaModule, forwardRef(() => UsersModule)],
  exports: [PostsService],
})
export class PostsModule {}
