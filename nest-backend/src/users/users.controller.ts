import { Body, Controller, forwardRef, Get, Inject, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "./users.service";
import UserDto from "../auth/dto/user.dto";
import RefreshUsernameResponseDto from "./dto/refresh-username-response.dto";
import { RequirePermissionsGuard } from "../auth/require-permissions.guard";
import { Permission, RequirePermissions } from "../auth/permission.enum";
import VerifyUserRequestDto from "./dto/verify-user-request.dto";
import GetUserProfileResponseDto from "./dto/get-user-profile-response.dto";
import UpdateUserProfileRequestDto from "./dto/update-user-profile-request.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Refresh username for a specified user." })
  @ApiOkResponse({ type: RefreshUsernameResponseDto })
  @UseGuards(JwtAuthGuard)
  @Put("/refresh")
  async refreshUsername(@Req() request): Promise<RefreshUsernameResponseDto> {
    return await this.usersService.refreshUsername(request.user as UserDto);
  }

  @ApiOperation({ summary: "Verify a user." })
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
  @RequirePermissions(Permission.TEACHER_REQ_VERIFY, Permission.REP_REQ_VERIFY)
  @Post("/verify")
  async verifyUser(@Req() request, @Body() requestDto: VerifyUserRequestDto) {
    await this.usersService.verifyUser(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Request verification for teachers and representatives." })
  @RequirePermissions(Permission.TEACHER_REQ_VERIFY, Permission.REP_REQ_VERIFY)
  @UseGuards(JwtAuthGuard, RequirePermissionsGuard)
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
