import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RefreshTokensService } from "../../refresh-tokens/refresh-tokens.service";

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard("jwt-refresh") {
  constructor(private refreshTokenService: RefreshTokensService) {
    super();
  }

  /**
   * If the provided refresh token is valid, checks whether the token has been used.
   * If the provided refresh token has been used, then invalidated the corresponding refresh token family
   * and throws an unauthorized exception.
   * @param context Execution context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const refreshTokenCookie = context.switchToHttp().getRequest().cookies.auth;
    const refreshToken = await this.refreshTokenService.getRefreshTokenByValue(refreshTokenCookie);
    if (!refreshToken || refreshToken.used) {
      if (refreshToken) {
        await this.refreshTokenService.invalidateRefreshTokenFamilyByFamily(refreshToken.tokenFamily);
      }
      throw new UnauthorizedException();
    } else {
      return true;
    }
  }
}
