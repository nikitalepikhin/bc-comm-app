import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export default class DismissNotificationRequestDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  notificationUuid: string;
}
