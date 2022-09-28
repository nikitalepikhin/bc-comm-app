import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthoritiesModule } from "../authorities/authorities.module";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [PrismaModule, AuthoritiesModule, UsersModule],
})
export class CommentsModule {}
