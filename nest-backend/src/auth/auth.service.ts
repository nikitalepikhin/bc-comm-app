import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import CreateBaseUserDto from "../users/dto/create-base-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from "uuid";
import { RefreshTokensService } from "../refresh-tokens/refresh-tokens.service";
import UserRefreshDto from "./dto/user-refresh.dto";
import CreateRepresentativeUserDto from "../users/dto/create-representative-user.dto";
import { CreateTeacherUserDto } from "../users/dto/create-teacher-user.dto";
import UserDto from "./dto/user.dto";
import UpdateUserEmailRequestDto from "./dto/update-user-email-request.dto";
import UpdateUserPasswordRequestDto from "./dto/update-user-password-request.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokensService: RefreshTokensService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { uuid, role, email } = user;
      return { uuid, role, email };
    }
    return null;
  }

  async signUpBaseUser(createBaseUserDto: CreateBaseUserDto): Promise<void> {
    await this.usersService.createBaseUser(createBaseUserDto);
  }

  async signUpRepresentativeUser(createRepresentativeUserDto: CreateRepresentativeUserDto) {
    await this.usersService.createRepresentativeUser(createRepresentativeUserDto);
  }

  async logInUser(user: UserDto) {
    const { schoolUuid, verified } = await this.getAdditionalUserData(user);
    return {
      accessToken: this.createSignedAccessToken(user),
      refreshToken: await this.createRefreshTokenForNewFamily(user),
      schoolUuid: schoolUuid ? schoolUuid : undefined,
      verified,
    };
  }

  async refreshToken(user: UserRefreshDto, authCookie: string) {
    const refreshToken = await this.refreshTokensService.setRefreshTokenToUsedByValue(authCookie);
    const { username } = await this.usersService.findByUuid(user.uuid);
    const { schoolUuid, verified } = await this.getAdditionalUserData(user);
    return {
      accessToken: this.createSignedAccessToken({
        email: user.email,
        role: user.role,
        uuid: user.uuid,
      }),
      refreshToken: await this.createRefreshTokenForExistingFamily(user, refreshToken.tokenFamily),
      username,
      schoolUuid,
      verified,
    };
  }

  async logOutUser(tokenFamily: string) {
    await this.refreshTokensService.invalidateRefreshTokenFamilyByFamily(tokenFamily);
  }

  async signUpTeacherUser(createTeacherUserDto: CreateTeacherUserDto) {
    return await this.usersService.createTeacherUser(createTeacherUserDto);
  }

  async updateUserEmail(
    user: UserRefreshDto,
    requestDto: UpdateUserEmailRequestDto,
    authCookie: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // 1. update the actual email in the database
    await this.usersService.updateUserEmail(user.uuid, requestDto.email);
    // 2. issue a new access-token
    const accessToken = this.createSignedAccessToken(user);
    // 3. issue a new refresh-token for an existing family
    const { tokenFamily } = await this.refreshTokensService.setRefreshTokenToUsedByValue(authCookie);
    const refreshToken = await this.createRefreshTokenForExistingFamily(user, tokenFamily);
    return { accessToken, refreshToken };
  }

  private createSignedAccessToken(user: UserDto) {
    const payload = {
      id: user.uuid,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + parseInt(process.env.AT_MAX_AGE_SEC),
    };
    return this.jwtService.sign(payload);
  }

  private async createRefreshTokenForNewFamily(userDto: UserDto): Promise<string> {
    const payload = {
      uuid: userDto.uuid,
      email: userDto.email,
      role: userDto.role,
      family: uuidv4(),
      exp: Math.floor(Date.now() / 1000) + parseInt(process.env.RT_MAX_AGE_SEC),
    };
    const refreshToken = this.jwtService.sign(payload);
    await this.refreshTokensService.createRefreshToken(refreshToken, payload.family);
    return refreshToken;
  }

  private async createRefreshTokenForExistingFamily(userDto: UserRefreshDto, family: string): Promise<string> {
    const payload = {
      uuid: userDto.uuid,
      email: userDto.email,
      role: userDto.role,
      family,
      exp: Math.floor(Date.now() / 1000) + parseInt(process.env.RT_MAX_AGE_SEC),
      rand: uuidv4(),
    };
    const refreshToken = this.jwtService.sign(payload);
    await this.refreshTokensService.createRefreshToken(refreshToken, family);
    return refreshToken;
  }

  private async getAdditionalUserData(user: UserDto) {
    let schoolUuid: string | undefined;
    let verified: boolean | undefined;
    if (user.role === "REPRESENTATIVE") {
      const representative = await this.usersService.getRepresentativeByUuid(user.uuid);
      schoolUuid = representative.schoolUuid;
      verified = representative.verified;
    }
    if (user.role === "TEACHER") {
      const teacher = await this.usersService.getTeacherByUuid(user.uuid);
      verified = teacher.verified;
    }
    return { schoolUuid, verified };
  }

  async updateUserPassword(user: UserDto, requestDto: UpdateUserPasswordRequestDto) {
    await this.usersService.updateUserPassword(user.uuid, requestDto.password);
  }
}
