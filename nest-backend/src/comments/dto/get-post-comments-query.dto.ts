import { ApiProperty } from "@nestjs/swagger";
import { CommentsOrder } from "./comments-order.enum";
import { IsDateString, IsEnum, IsISO8601, IsNotEmpty, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export default class GetPostCommentsQueryDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @IsEnum(CommentsOrder)
  @ApiProperty({ enum: [CommentsOrder.top, CommentsOrder.new] })
  order: CommentsOrder;

  @IsNotEmpty()
  @IsDateString()
  @IsISO8601({ strict: true })
  @ApiProperty({ type: Date })
  after: Date;
}
