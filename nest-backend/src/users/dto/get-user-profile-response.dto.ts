import { ApiProperty } from "@nestjs/swagger";

export default class GetUserProfileResponseDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  bio?: string;
}
