import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export default class ChannelOwnerDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  role: Role;
}
