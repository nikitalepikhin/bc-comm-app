import { Body, Controller, Delete, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import CreateBaseUserRequestDto, { BaseRole } from "./dto/create-base-user-request.dto";
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./local/local-auth.guard";
import { Response } from "express";
import { CookieService } from "../cookie/cookie.service";
import { JwtRefreshAuthGuard } from "./jwt-refresh/jwt-refresh-auth.guard";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { ApiImplicitBody } from "@nestjs/swagger/dist/decorators/api-implicit-body.decorator";
import LogInUserRequestDto from "../users/dto/log-in-user-request.dto";
import UserDataResponseDto from "../users/dto/user-data-response.dto";
import CreateRepresentativeUserRequestDto from "./dto/create-representative-user-request.dto";
import { CreateTeacherUserRequestDto } from "./dto/create-teacher-user-request.dto";
import UpdateUserEmailResponseDto from "./dto/update-user-email-response.dto";
import UserDto from "./dto/user.dto";
import UserRefreshDto from "./dto/user-refresh.dto";
import UpdateUserEmailRequestDto from "./dto/update-user-email-request.dto";
import UpdateUserPasswordRequestDto from "./dto/update-user-password-request.dto";
import { BasicAuthGuard } from "./basic/basic-auth.guard";

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
    const { accessToken, refreshToken, schoolUuid, verified, username, requestsVerification, verificationMessage } =
      await this.authService.logInUser(request.user as UserDto);
    response.cookie("auth", refreshToken, this.cookieService.generateAuthCookieOptions());
    return {
      accessToken,
      schoolUuid,
      verified,
      username,
      requestsVerification,
      verificationMessage,
      ...request.user,
    } as UserDataResponseDto;
  }

  @ApiOperation({ summary: "Sign up an admin." })
  @UseGuards(BasicAuthGuard)
  @Post("signup/admin")
  async signUpAdmin(@Body() requestDto: CreateBaseUserRequestDto): Promise<void> {
    await this.authService.signUpBaseUser(requestDto, BaseRole.ADMIN);
  }

  @ApiOperation({ summary: "Sign up a student." })
  @Post("signup/student")
  async signUpBase(@Body() requestDto: CreateBaseUserRequestDto) {
    return await this.authService.signUpBaseUser(requestDto, BaseRole.STUDENT);
  }

  @ApiOperation({ summary: "Sign up a representative." })
  @Post("signup/representative")
  async signUpRepresentative(@Body() requestDto: CreateRepresentativeUserRequestDto) {
    return await this.authService.signUpRepresentativeUser(requestDto);
  }

  @ApiOperation({ summary: "Sign up a teacher." })
  @Post("signup/teacher")
  async signUpTeacher(@Body() requestDto: CreateTeacherUserRequestDto) {
    return await this.authService.signUpTeacherUser(requestDto);
  }

  @ApiOperation({ summary: "Refresh the issued token pair." })
  @ApiResponse({ status: 201, description: "Authenticated user data", type: UserDataResponseDto, content: {} })
  @UseGuards(JwtRefreshAuthGuard)
  @Post("refresh")
  async refreshToken(@Req() request, @Res({ passthrough: true }) response: Response): Promise<UserDataResponseDto> {
    const authCookie = request.cookies.auth as string; // guaranteed to be valid and not used by the JwtRefreshAuthGuard
    const { accessToken, refreshToken, username, schoolUuid, verified, requestsVerification, verificationMessage } =
      await this.authService.refreshToken(request.user, authCookie);
    response.cookie("auth", refreshToken, this.cookieService.generateAuthCookieOptions());
    return {
      accessToken,
      uuid: request.user.uuid,
      email: request.user.email,
      username,
      role: request.user.role,
      schoolUuid,
      verified,
      requestsVerification,
      verificationMessage,
    };
  }

  @ApiOperation({ summary: "Log the user out." })
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logOut(@Req() request, @Res({ passthrough: true }) response: Response) {
    await this.authService.logOutUser(request.user.family);
    response.cookie("auth", null, this.cookieService.generateInvalidAuthCookieOptions());
  }

  @ApiOperation({ summary: "Update user's email." })
  @ApiOkResponse({ type: UpdateUserEmailResponseDto })
  @UseGuards(JwtRefreshAuthGuard)
  @Put("/update/email")
  async updateEmail(
    @Req() request,
    @Body() requestDto: UpdateUserEmailRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UpdateUserEmailResponseDto> {
    const authCookie = request.cookies.auth as string; // guaranteed to be valid and not used by the JwtRefreshAuthGuard
    const { accessToken, refreshToken } = await this.authService.updateUserEmail(
      request.user as UserRefreshDto,
      requestDto,
      authCookie,
    );
    response.cookie("auth", refreshToken, this.cookieService.generateAuthCookieOptions());
    return { accessToken, email: requestDto.email };
  }

  @ApiOperation({ summary: "Update user's password." })
  @UseGuards(JwtAuthGuard)
  @Put("/update/password")
  async updatePassword(@Req() request, @Body() requestDto: UpdateUserPasswordRequestDto) {
    await this.authService.updateUserPassword(request.user as UserDto, requestDto);
  }

  @ApiOperation({ summary: "Delete user's account." })
  @UseGuards(JwtAuthGuard)
  @Delete("/")
  async deleteAccount(@Req() request) {
    await this.authService.deleteAccount(request.user as UserDto);
  }
}
