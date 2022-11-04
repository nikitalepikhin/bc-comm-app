import { ApiProperty } from "@nestjs/swagger";
import { PostsOrder } from "./posts-order.enum";
import { IsEnum, IsISO8601, IsNumber, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";

export default class GetPostsForChannelQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ required: false })
  page?: number;

  @IsOptional()
  @IsEnum(PostsOrder)
  @ApiProperty({ enum: [...Object.values(PostsOrder)] })
  order?: PostsOrder;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({ type: Date })
  after?: Date;
}
