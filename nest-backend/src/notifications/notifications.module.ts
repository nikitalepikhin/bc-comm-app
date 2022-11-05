import { Module } from "@nestjs/common";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthoritiesModule } from "../authorities/authorities.module";

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [PrismaModule, AuthoritiesModule],
  exports: [NotificationsService],
})
export class NotificationsModule {}
