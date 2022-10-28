import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import UserDto from "../dto/user.dto";

@Injectable()
export class IsVerifiedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest() as { user: UserDto };
    // only allow users that are verified to proceed
    return user.isVerified ?? false;
  }
}
