import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export default class UserDataResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  uuid: string;

  @ApiProperty({ required: false })
  schoolUuid?: string;

  @ApiProperty()
  verified: boolean;
}
