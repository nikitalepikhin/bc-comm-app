import { PassportStrategy } from "@nestjs/passport";
import { BasicStrategy } from "passport-http";
import { UnauthorizedException } from "@nestjs/common";
import BasicAuthDto from "./basic-auth.dto";

export class BasicStrat extends PassportStrategy(BasicStrategy) {
  async validate(username: string, password: string): Promise<BasicAuthDto> {
    if (username !== process.env.BASIC_USERNAME || password !== process.env.BASIC_PASSWORD) {
      throw new UnauthorizedException("you shall not pass");
    }
    return {
      result: 1,
    };
  }
}
