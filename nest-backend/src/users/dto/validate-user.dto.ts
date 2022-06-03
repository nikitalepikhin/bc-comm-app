import { Role } from "@prisma/client";

export default class ValidateUserDto {
  uuid: string;
  email: string;
  username: string;
  role: Role;
}
