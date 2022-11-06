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
        comment: {
          include: {
            post: {
              include: {
                channel: true,
              },
            },
            parent: true,
          },
        },
      },
      orderBy: {
        comment: {
          created: "desc",
        },
      },
    });

    return {
      notifications: notifications.map((notification) => ({
        notificationUuid: notification.uuid,
        commentUuid: notification.comment.parentUuid ? notification.comment.parentUuid : notification.commentUuid,
        postUuid: notification.comment.post.uuid,
        channelTextId: notification.comment.post.channel.textId,
        comment: notification.comment.body.slice(0, 100),
        author: notification.comment.authorUsername,
        type: notification.comment.parentUuid ? NotificationType.COMMENT : NotificationType.POST,
        created: notification.comment.created,
        highlight: notification.commentUuid,
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
        if (e.name.toString().toLowerCase().includes("notfounderror") || e.code === "P2023") {
          throw new NotFoundException();
        }
      }
    });
  }

  async createNotification(commentUuid: string, userUuid: string): Promise<string> {
    return (
      await this.prisma.notification.create({
        data: {
          commentUuid,
          userUuid,
        },
      })
    ).uuid;
  }
}
