import { ApiProperty } from "@nestjs/swagger";
import TeacherRequestDto from "./teacher-request.dto";

export default class GetTeacherRequestsDto {
  @ApiProperty({ type: [TeacherRequestDto] })
  requests: TeacherRequestDto[];
}
