import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Permission, PERMISSIONS_KEY } from "./permission.enum";
import { AuthoritiesService } from "../authorities/authorities.service";

@Injectable()
export class RequirePermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private authoritiesService: AuthoritiesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (permissions === null || permissions.length === 0) {
      return true;
    } else {
      let result = true;
      for (const perm of permissions) {
        const { user } = context.switchToHttp().getRequest();
        const authority = await this.authoritiesService.getAuthorityByName(Permission[perm]);
        if (!authority) {
          throw new UnauthorizedException();
        }
        result = authority.roles.includes(user.role);
      }
      return result;
    }
  }
}
