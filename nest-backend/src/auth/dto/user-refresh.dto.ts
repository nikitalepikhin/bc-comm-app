import { Role } from "@prisma/client";

export default class UserRefreshDto {
  uuid: string;
  email: string;
  role: Role;
  family: string;
}
