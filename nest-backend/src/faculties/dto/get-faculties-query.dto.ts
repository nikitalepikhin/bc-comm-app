import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min } from "class-validator";

export default class GetFacultiesQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ required: false, type: "number" })
  page?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ required: false, type: "number" })
  count?: string;
}
