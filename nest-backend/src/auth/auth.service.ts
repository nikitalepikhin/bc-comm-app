import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import CreateBaseUserDto from "../users/dto/create-base-user.dto";
import * as bcrypt from "bcrypt";
import ValidateUserDto from "../users/dto/validate-user.dto";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from "uuid";
import { RefreshTokensService } from "../refresh-tokens/refresh-tokens.service";
import { JwtRefreshStrategyUserDto } from "./dto/jwt-refresh-strategy-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokensService: RefreshTokensService,
  ) {}

  async validateUser(email: string, password: string): Promise<ValidateUserDto> {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compare(password, user.password)) {
      const { uuid, role, username, email } = user;
      return { uuid, role, username, email };
    }
    return null;
  }

  async signUpBaseUser(createBaseUserDto: CreateBaseUserDto): Promise<void> {
    await this.usersService.createBaseUser(createBaseUserDto);
  }

  async logInUser(userDto: ValidateUserDto) {
    return {
      accessToken: this.createSignedAccessToken(userDto),
      refreshToken: await this.createRefreshTokenForNewFamily(userDto),
    };
  }

  async refreshToken(user: JwtRefreshStrategyUserDto, authCookie: string) {
    const refreshToken = await this.refreshTokensService.setRefreshTokenToUsedByValue(authCookie);
    const username = (await this.usersService.findByUuid(user.uuid)).username;
    return {
      accessToken: this.createSignedAccessToken({
        email: user.email,
        role: user.role,
        uuid: user.uuid,
        username,
      }),
      refreshToken: await this.createRefreshTokenForExistingFamily(user, refreshToken.tokenFamily),
      username,
    };
  }

  async logOutUser(tokenFamily: string) {
    await this.refreshTokensService.invalidateRefreshTokenFamilyByFamily(tokenFamily);
  }

  private createSignedAccessToken(user: ValidateUserDto) {
    const payload = {
      id: user.uuid,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + parseInt(process.env.AT_MAX_AGE_SEC),
    };
    return this.jwtService.sign(payload);
  }

  private async createRefreshTokenForNewFamily(validateUserDto: ValidateUserDto): Promise<string> {
    const payload = {
      uuid: validateUserDto.uuid,
      email: validateUserDto.email,
      role: validateUserDto.role,
      family: uuidv4(),
      exp: Math.floor(Date.now() / 1000) + parseInt(process.env.RT_MAX_AGE_SEC),
    };
    const refreshToken = this.jwtService.sign(payload);
    await this.refreshTokensService.createRefreshToken(refreshToken, payload.family);
    return refreshToken;
  }

  private async createRefreshTokenForExistingFamily(
    userDto: JwtRefreshStrategyUserDto,
    family: string,
  ): Promise<string> {
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
}
