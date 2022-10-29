import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import UserDto from "../dto/user.dto";

@Injectable()
export class IsNotVerifiedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest() as { user: UserDto };
    if (user.isVerified === undefined || !user.isVerified) {
      // only allow users that are NOT verified to procceed
      return true;
    } else {
      throw new ForbiddenException("cannot be verified to access");
    }
  }
}
