import { ApiProperty } from "@nestjs/swagger";
import RepresentativeRequestDto from "../../representatives/dto/representative-request.dto";
import TeacherRequestDto from "./teacher-request.dto";

export default class GetTeacherRequestsDto {
  @ApiProperty({ type: [TeacherRequestDto] })
  requests: TeacherRequestDto[];
}
