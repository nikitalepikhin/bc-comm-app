import { ApiProperty } from "@nestjs/swagger";

export default class GetUserFeedQueryDto {
  @ApiProperty()
  page: number;

  @ApiProperty({ type: Date })
  after: Date;
}
