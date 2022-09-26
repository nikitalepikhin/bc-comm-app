import { ApiProperty } from "@nestjs/swagger";

export default class ToggleChannelMembershipRequestDto {
  @ApiProperty()
  channelUuid: string;

  @ApiProperty()
  joining: boolean;
}
