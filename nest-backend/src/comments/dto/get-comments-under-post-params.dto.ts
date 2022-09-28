import { ApiProperty } from "@nestjs/swagger";
import { CommentsOrder } from "./comments-order.enum";

export default class GetCommentsUnderPostParamsDto {
  @ApiProperty()
  postUuid: string;

  @ApiProperty({ enum: ["top", "new"] })
  order: CommentsOrder;
}
