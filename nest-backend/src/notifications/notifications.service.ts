import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import UserDto from "../auth/dto/user.dto";
import GetUserNotificationsResponseDto from "./dto/get-user-notifications-response.dto";
import { NotificationType } from "./dto/notification-type.enum";

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async getUserNotifications(user: UserDto): Promise<GetUserNotificationsResponseDto> {
    const notifications = await this.prisma.notification.findMany({
      where: { user: { uuid: user.uuid } },
      include: {
        user: true,
        comment: true,
      },
    });

    return {
      notifications: notifications.map((notification) => ({
        notificationUuid: notification.uuid,
        commentUuid: notification.commentUuid,
        comment: notification.comment.body.slice(0, 100),
        author: notification.comment.authorUsername,
        type: notification.comment.parentUuid ? NotificationType.COMMENT : NotificationType.POST,
        created: notification.comment.created,
      })),
    };
  }

  async dismissUserNotification(user: UserDto, notificationUuid: string) {
    await this.prisma.$transaction(async (tx) => {
      try {
        // 1. check that this notification belongs to the user
        await tx.notification.findFirstOrThrow({
          where: { uuid: notificationUuid, userUuid: user.uuid },
        });
        // 2. delete the notification to mark it as dismissed
        await tx.notification.delete({ where: { uuid: notificationUuid } });
      } catch (e) {
        if (e.name.toString().toLowerCase().includes("notfounderror")) {
          throw new NotFoundException();
        }
      }
    });
  }
}
