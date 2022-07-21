import { ApiProperty } from "@nestjs/swagger";
import RepresentativeRequestDto from "./representative-request.dto";

export default class GetRepresentativeRequestsDto {
  @ApiProperty({ type: [RepresentativeRequestDto] })
  requests: RepresentativeRequestDto[];
}
