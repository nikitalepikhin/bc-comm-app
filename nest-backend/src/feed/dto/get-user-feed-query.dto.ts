import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601, IsNumber, IsOptional, Min } from "class-validator";

export default class GetUserFeedQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  page?: number;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({ type: Date })
  after?: Date;
}
