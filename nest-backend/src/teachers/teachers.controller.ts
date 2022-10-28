import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Permission, RequirePermissions } from "../auth/require-permissions/permission.enum";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions/require-permissions.guard";
import { TeachersService } from "./teachers.service";
import GetTeacherRequestsDto from "./dto/get-teacher-requests.dto";

@Controller("teachers")
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @ApiOperation({ summary: "Get teacher verification requests." })
  @ApiOkResponse({
    description: "Teacher verification requests.",
    type: GetTeacherRequestsDto,
    content: {},
  })
  @RequirePermissions(Permission.TEACHER_REQ_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/verify")
  async getTeacherVerificationRequests(): Promise<GetTeacherRequestsDto> {
    return await this.teachersService.getVerificationRequests();
  }
}
