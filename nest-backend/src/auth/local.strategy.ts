import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email", passwordField: "password" });
  }

  async validate(email: string, password: string): Promise<any> {
    const validateUserDto = await this.authService.validateUser(email, password);
    if (!validateUserDto) {
      throw new UnauthorizedException();
    }
    return {
      uuid: validateUserDto.uuid,
      email: validateUserDto.email,
      username: validateUserDto.username,
      role: validateUserDto.role,
    };
  }
}
