import { ApiProperty } from "@nestjs/swagger";
import { NotificationType } from "./notification-type.enum";

export default class NotificationDto {
  @ApiProperty()
  notificationUuid: string;

  @ApiProperty()
  commentUuid: string;

  @ApiProperty()
  channelTextId: string;

  @ApiProperty()
  postUuid: string;

  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  created: Date;
}
