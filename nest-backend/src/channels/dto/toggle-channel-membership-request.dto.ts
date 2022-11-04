import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsUUID } from "class-validator";

export default class ToggleChannelMembershipRequestDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  channelUuid: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  joining: boolean;
}
