import { Role } from "@prisma/client";

export class JwtRefreshStrategyUserDto {
  uuid: string;
  email: string;
  role: Role;
  family: string;
}
