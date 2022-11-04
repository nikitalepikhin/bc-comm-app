import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601, IsNumber, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";

export default class GetUserFeedQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty()
  page?: number;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({ type: Date })
  after?: Date;
}
