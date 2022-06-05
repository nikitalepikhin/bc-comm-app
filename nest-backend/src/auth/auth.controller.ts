import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import CreateBaseUserDto from "../users/dto/create-base-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./local-auth.guard";
import { Response } from "express";
import { CookieService } from "../cookie/cookie.service";
import { JwtRefreshAuthGuard } from "./jwt-refresh-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private cookieService: CookieService) {}

  @ApiOperation({ summary: "Log the user in." })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async logIn(@Req() request, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken } = await this.authService.logInUser(request.user);
    response.cookie("auth", refreshToken, this.cookieService.generateAuthCookieOptions());
    return { accessToken, ...request.user };
  }

  @ApiOperation({ summary: "Sign up a base user." })
  @Post("signup/base")
  async signUp(@Body() createBaseUserDto: CreateBaseUserDto) {
    return this.authService.signUpBaseUser(createBaseUserDto);
  }

  @ApiOperation({ summary: "Refresh the issued token pair." })
  @UseGuards(JwtRefreshAuthGuard)
  @Post("refresh")
  async refreshToken(@Req() request, @Res({ passthrough: true }) response: Response) {
    const authCookie = request.cookies.auth; // guaranteed to be valid and not used by the JwtRefreshAuthGuard
    const { accessToken, refreshToken } = await this.authService.refreshToken(request.user, authCookie);
    response.cookie("auth", refreshToken, this.cookieService.generateAuthCookieOptions());
    return { accessToken, email: request.user.email, username: request.user.username };
  }

  @ApiOperation({ summary: "Log the user out." })
  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtRefreshAuthGuard)
  @Post("logout")
  async logOut(@Req() request, @Res({ passthrough: true }) response: Response) {
    await this.authService.logOutUser(request.user.family);
    response.cookie("auth", null, this.cookieService.generateInvalidAuthCookieOptions());
  }

  // todo - register teacher

  // todo - register representative
}
