import { Role } from "@prisma/client";

export default class UserDto {
  uuid: string;
  email: string;
  role: Role;
  isVerified?: boolean;
}
