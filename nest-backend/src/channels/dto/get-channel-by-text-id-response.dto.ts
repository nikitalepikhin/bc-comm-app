import { ApiProperty } from "@nestjs/swagger";
import ChannelOwnerDto from "./channel-owner.dto";

export default class GetChannelByTextIdResponseDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  textId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isOwner: boolean;

  @ApiProperty()
  isMember: boolean;

  @ApiProperty()
  memberCount: number;

  @ApiProperty()
  created: Date;

  @ApiProperty({ type: ChannelOwnerDto })
  owner: ChannelOwnerDto;
}
