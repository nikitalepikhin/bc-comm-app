import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import UserDto from "../dto/user.dto";

@Injectable()
export class IsVerifiedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest() as { user: UserDto };
    if (user.isVerified === undefined || !user.isVerified) {
      throw new ForbiddenException("verification required to access");
    }
    // only allow users that are verified to proceed
    return true;
  }
}
