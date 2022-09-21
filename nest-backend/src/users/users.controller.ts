import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "./users.service";
import UserDto from "../auth/dto/user.dto";
import RefreshUsernameResponseDto from "./dto/refresh-username-response.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Refresh username for a specified user." })
  @UseGuards(JwtAuthGuard)
  @Get("/refresh")
  async refreshUsername(@Req() request): Promise<RefreshUsernameResponseDto> {
    return await this.usersService.refreshUsername(request.user as UserDto);
  }
}
