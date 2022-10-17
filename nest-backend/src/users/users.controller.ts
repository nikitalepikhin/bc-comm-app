import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "./users.service";
import UserDto from "../auth/dto/user.dto";
import RefreshUsernameResponseDto from "./dto/refresh-username-response.dto";
import { RequirePermissionsGuard } from "../auth/require-permissions.guard";
import { Permission, RequirePermissions } from "../auth/permission.enum";
import VerifyUserRequestDto from "./dto/verify-user-request.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Refresh username for a specified user." })
  @UseGuards(JwtAuthGuard)
  @Get("/refresh")
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
}
