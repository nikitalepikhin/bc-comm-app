import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import CreateBaseUserDto from "../users/dto/create-base-user.dto";
import * as bcrypt from "bcrypt";
import * as ms from "ms";
import ValidateUserDto from "../users/dto/validate-user.dto";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from "uuid";
import { RefreshTokensService } from "../refresh-tokens/refresh-tokens.service";

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

  async logInUser(validateUserDto: ValidateUserDto) {
    const payload = {
      id: validateUserDto.uuid,
      email: validateUserDto.email,
      role: validateUserDto.role,
      exp: Math.floor(Date.now() / 1000) + ms("5 min") / 1000,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: await this.createRefreshTokenForNewFamily(validateUserDto),
    };
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

  async refreshToken(user) {}
}
