import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import UserRefreshDto from "./dto/user-refresh.dto";
import { Request } from "express";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        if (req && req.cookies["auth"]) {
          return req.cookies.auth;
        } else {
          return null;
        }
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * The JWT passport strategy guarantees that this method will always receive payload from a valid token.
   * Invalid token will raise an exception behind the scenes and deny the request with a 401 error.
   * @param payload Refresh token payload.
   */
  async validate(payload: any): Promise<UserRefreshDto> {
    return {
      uuid: payload.uuid,
      email: payload.email,
      role: payload.role,
      family: payload.family,
    };
  }
}
