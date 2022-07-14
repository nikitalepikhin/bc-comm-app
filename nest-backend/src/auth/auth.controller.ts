import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import CreateBaseUserDto from "../users/dto/create-base-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./local-auth.guard";
import { Response } from "express";
import { CookieService } from "../cookie/cookie.service";
import { JwtRefreshAuthGuard } from "./jwt-refresh-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ApiImplicitBody } from "@nestjs/swagger/dist/decorators/api-implicit-body.decorator";
import LogInUserRequestDto from "../users/dto/log-in-user-request.dto";
import UserDataResponseDto from "../users/dto/user-data-response.dto";
import CreateRepresentativeUserDto from "../users/dto/create-representative-user.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private cookieService: CookieService) {}

  @ApiOperation({ summary: "Log the user in." })
  @ApiImplicitBody({ name: "", type: LogInUserRequestDto, content: {} })
  @ApiResponse({ status: 201, description: "Authenticated user data", type: UserDataResponseDto, content: {} })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async logIn(@Req() request, @Res({ passthrough: true }) response: Response): Promise<UserDataResponseDto> {
    const { accessToken, refreshToken } = await this.authService.logInUser(request.user);
    response.cookie("auth", refreshToken, this.cookieService.generateAuthCookieOptions());
    return { accessToken, ...request.user } as UserDataResponseDto;
  }

  @ApiOperation({ summary: "Sign up a base user." })
  @Post("signup/base")
  async signUpBase(@Body() createBaseUserDto: CreateBaseUserDto) {
    return await this.authService.signUpBaseUser(createBaseUserDto);
  }

  @ApiOperation({ summary: "Sign up a representative user." })
  @Post("signup/representative")
  async signUpRepresentative(@Body() createRepresentativeUserDto: CreateRepresentativeUserDto) {
    return await this.authService.signUpRepresentativeUser(createRepresentativeUserDto);
  }

  @ApiOperation({ summary: "Refresh the issued token pair." })
  @ApiResponse({ status: 201, description: "Authenticated user data", type: UserDataResponseDto, content: {} })
  @UseGuards(JwtRefreshAuthGuard)
  @Post("refresh")
  async refreshToken(@Req() request, @Res({ passthrough: true }) response: Response): Promise<UserDataResponseDto> {
    const authCookie = request.cookies.auth; // guaranteed to be valid and not used by the JwtRefreshAuthGuard
    const { accessToken, refreshToken, username } = await this.authService.refreshToken(request.user, authCookie);
    response.cookie("auth", refreshToken, this.cookieService.generateAuthCookieOptions());
    return {
      accessToken,
      uuid: request.user.uuid,
      email: request.user.email,
      username,
      role: request.user.role,
    };
  }

  @ApiOperation({ summary: "Log the user out." })
  @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtRefreshAuthGuard)
  @Post("logout")
  async logOut(@Req() request, @Res({ passthrough: true }) response: Response) {
    await this.authService.logOutUser(request.user.family);
    response.cookie("auth", null, this.cookieService.generateInvalidAuthCookieOptions());
  }

  // todo - register teacher

  // todo - register representative
}
