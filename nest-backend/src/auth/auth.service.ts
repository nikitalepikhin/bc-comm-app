import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import CreateBaseUserDto from "../users/dto/create-base-user.dto";
import * as bcrypt from "bcrypt";
import * as ms from "ms";
import ValidateUserDto from "../users/dto/validate-user.dto";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from "uuid";
import { RefreshTokensService } from "../refresh-tokens/refresh-tokens.service";
import { JwtRefreshStrategyUserDto } from "./dto/jwt-refresh-strategy-user.dto";
import { RefreshToken } from "@prisma/client";

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
      accessToken: this.getSignedAccessToken(userDto),
      refreshToken: await this.createRefreshTokenForNewFamily(userDto),
    };
  }

  private getSignedAccessToken(user: ValidateUserDto) {
    const payload = {
      id: user.uuid,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + ms("5 min") / 1000,
    };
    return this.jwtService.sign(payload);
  }

  private async createRefreshTokenForNewFamily(validateUserDto: ValidateUserDto): Promise<string> {
    const payload = {
      uuid: validateUserDto.uuid,
      email: validateUserDto.email,
      role: validateUserDto.role,
      family: uuidv4(),
      exp: Math.floor(Date.now() / 1000) + ms("1 week") / 1000,
    };
    const refreshToken = this.jwtService.sign(payload);
    await this.refreshTokensService.createRefreshTokenForNewFamily(refreshToken, payload.family);
    return refreshToken;
  }

  async refreshToken(user: JwtRefreshStrategyUserDto, authCookie: string) {
    const existingRefreshToken: RefreshToken = await this.refreshTokensService.getRefreshToken(authCookie);
    if (existingRefreshToken.used) {
      await this.refreshTokensService.invalidateRefreshTokenFamily(existingRefreshToken);
      throw new UnauthorizedException();
    } else {
      await this.refreshTokensService.setRefreshTokenToUsed(existingRefreshToken);
      return {
        accessToken: this.getSignedAccessToken({
          email: user.email,
          role: user.role,
          uuid: user.uuid,
          username: await this.usersService.getUserUsername(user.uuid),
        }),
        refreshToken: await this.createRefreshTokenForExistingFamily(user, existingRefreshToken.tokenFamily),
      };
    }
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
      exp: Math.floor(Date.now() / 1000) + ms("1 week") / 1000,
    };
    const refreshToken = this.jwtService.sign(payload);
    await this.refreshTokensService.createRefreshTokenForNewFamily(refreshToken, payload.family);
    return refreshToken;
  }
}
