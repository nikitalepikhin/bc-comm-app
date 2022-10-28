import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import UserDto from "../dto/user.dto";

@Injectable()
export class IsNotVerifiedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest() as { user: UserDto };
    // only allow users that are not verified to procceed
    return user.isVerified ? !user.isVerified : true;
  }
}
