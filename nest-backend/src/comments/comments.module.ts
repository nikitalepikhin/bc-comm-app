import { forwardRef, Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthoritiesModule } from "../authorities/authorities.module";
import { UsersModule } from "../users/users.module";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [PrismaModule, AuthoritiesModule, forwardRef(() => UsersModule), NotificationsModule],
  exports: [CommentsService],
})
export class CommentsModule {}
