import { ApiProperty } from "@nestjs/swagger";
import { CommentsOrder } from "./comments-order.enum";

export default class GetCommentsUnderPostQueryDto {
  @ApiProperty()
  page: number;

  @ApiProperty({ enum: ["top", "new"] })
  order: CommentsOrder;

  @ApiProperty({ type: Date })
  after: Date;
}
