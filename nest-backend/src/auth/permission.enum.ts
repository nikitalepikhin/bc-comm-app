import { SetMetadata } from "@nestjs/common";

export enum Permission {
  SCHOOL_CREATE,
  SCHOOL_READ,
  SCHOOL_UPDATE,
  SCHOOL_DELETE,
}

export const PERMISSIONS_KEY = "permissions";

export const RequirePermissions = (...permissions: Permission[]) => SetMetadata(PERMISSIONS_KEY, permissions);
