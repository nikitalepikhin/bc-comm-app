import { Injectable } from "@nestjs/common";
import { CookieOptions } from "express";

@Injectable()
export class CookieService {
  generateAuthCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.HTTPS_ENABLED === "true",
      domain: process.env.HTTPS_ENABLED === "true" ? process.env.COOKIE_DOMAIN : undefined,
      path: "/",
      maxAge: parseInt(process.env.RT_MAX_AGE_SEC),
    };
  }

  generateInvalidAuthCookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.HTTPS_ENABLED === "true",
      domain: process.env.HTTPS_ENABLED === "true" ? process.env.COOKIE_DOMAIN : undefined,
      path: "/",
      maxAge: 0,
    };
  }
}
