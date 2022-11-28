import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { IsNotVerifiedGuard } from "../auth/verification/is-not-verified.guard";
import { IsVerifiedGuard } from "../auth/verification/is-verified.guard";
import UserDto from "../auth/dto/user.dto";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { Permission, RequirePermissions } from "../auth/require-permissions/permission.enum";
import { RequirePermissionsGuard } from "../auth/require-permissions/require-permissions.guard";
import GetUserProfileResponseDto from "./dto/get-user-profile-response.dto";
import RefreshUsernameResponseDto from "./dto/refresh-username-response.dto";
import UpdateUserProfileRequestDto from "./dto/update-user-profile-request.dto";
import VerifyUserRequestDto from "./dto/verify-user-request.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Refresh username for a specified user." })
  @ApiOkResponse({ type: RefreshUsernameResponseDto })
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @RequirePermissions(Permission.USERNAME_REFRESH)
  @Put("/refresh")
  async refreshUsername(@Req() request): Promise<RefreshUsernameResponseDto> {
    return await this.usersService.refreshUsername(request.user as UserDto);
  }

  @ApiOperation({ summary: "Verify a teacher." })
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @RequirePermissions(Permission.TEACHER_REQ_VERIFY)
  @Post("/verify/teacher")
  async verifyTeacher(@Req() request, @Body() requestDto: VerifyUserRequestDto) {
    await this.usersService.verifyUser(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Verify a representative." })
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsVerifiedGuard)
  @RequirePermissions(Permission.REP_REQ_VERIFY)
  @Post("/verify/representative")
  async verifyRepresentative(@Req() request, @Body() requestDto: VerifyUserRequestDto) {
    await this.usersService.verifyUser(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Request verification for teachers and representatives." })
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard, IsNotVerifiedGuard)
  @RequirePermissions(Permission.REQ_UPDATE)
  @Get("/request")
  async requestVerification(@Req() request) {
    await this.usersService.requestVerification(request.user as UserDto);
  }

  @ApiOperation({ summary: "Get user name and bio." })
  @ApiOkResponse({ type: GetUserProfileResponseDto })
  @RequirePermissions(Permission.USER_READ)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Get("/")
  async getUserProfile(@Req() request): Promise<GetUserProfileResponseDto> {
    return await this.usersService.getUserProfile(request.user as UserDto);
  }

  @ApiOperation({ summary: "Update user profile." })
  @RequirePermissions(Permission.USER_UPDATE)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @Put("/")
  async updateUserProfile(@Req() request, @Body() requestDto: UpdateUserProfileRequestDto) {
    await this.usersService.updateUserProfile(request.user as UserDto, requestDto);
  }
}
