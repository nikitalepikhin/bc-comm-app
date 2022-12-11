import { Injectable } from "@nestjs/common";
import { CookieOptions } from "express";

@Injectable()
export class CookieService {
  generateAuthCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.HTTPS_ENABLED === "true",
      domain: process.env.COOKIE_DOMAIN,
      path: "/",
      maxAge: parseInt(process.env.RT_MAX_AGE_SEC) * 1000,
      sameSite: "strict",
    };
  }

  generateInvalidAuthCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.HTTPS_ENABLED === "true",
      domain: process.env.COOKIE_DOMAIN,
      path: "/",
      maxAge: 0,
      sameSite: "strict",
    };
  }
}
