import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Permission, RequirePermissions } from "../auth/permission.enum";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RequirePermissionsGuard } from "../auth/require-permissions.guard";
import { TeachersService } from "./teachers.service";
import GetTeacherRequestsDto from "./dto/get-teacher-requests.dto";
import VerifyTeacherUserRequestDto from "./dto/verify-teacher-user-request.dto";
import UserDto from "../auth/dto/user.dto";

@Controller("teachers")
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @ApiOperation({ summary: "Request verification." })
  @RequirePermissions(Permission.TEACHER_REQ_VERIFY)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/request")
  async requestTeacherVerification(@Req() request) {
    await this.teachersService.requestVerification(request.user);
  }

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
    return await this.teachersService.getTeacherVerificationRequests();
  }

  @ApiOperation({ summary: "Verify teacher or decline verification request." })
  @RequirePermissions(Permission.TEACHER_REQ_UPDATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Post("/verify")
  async verifyTeacherUser(@Req() request, @Body() verifyTeacherUserRequest: VerifyTeacherUserRequestDto) {
    await this.teachersService.verifyTeacherUser(request.user as UserDto, verifyTeacherUserRequest);
  }
}
