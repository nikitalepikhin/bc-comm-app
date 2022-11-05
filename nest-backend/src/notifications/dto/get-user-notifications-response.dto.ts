import { ApiProperty } from "@nestjs/swagger";
import NotificationDto from "./notification.dto";

export default class GetUserNotificationsResponseDto {
  @ApiProperty({ type: [NotificationDto] })
  notifications: NotificationDto[];
}
