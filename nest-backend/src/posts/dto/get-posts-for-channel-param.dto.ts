import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class GetPostsForChannelParamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  channelTextId: string;
}
