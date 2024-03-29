import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import UserDto from "../dto/user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * The JWT passport strategy guarantees that this method will always receive payload from a valid token.
   * Invalid token will raise an exception behind the scenes and deny the request with a 401 error.
   * @param payload Access token payload.
   */
  async validate(payload: any): Promise<UserDto> {
    return {
      uuid: payload.id,
      email: payload.email,
      role: payload.role,
      isVerified: payload.isVerified,
    };
  }
}
