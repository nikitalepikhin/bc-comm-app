import { SetMetadata } from "@nestjs/common";

export enum Permission {
  SCHOOL_CREATE,
  SCHOOL_READ,
  SCHOOL_UPDATE,
  SCHOOL_DELETE,
  FACULTY_CREATE,
  FACULTY_READ,
  FACULTY_UPDATE,
  FACULTY_DELETE,
  REP_REQ_READ,
  REP_REQ_UPDATE,
  REP_REQ_VERIFY,
}

export const PERMISSIONS_KEY = "permissions";

export const RequirePermissions = (...permissions: Permission[]) => SetMetadata(PERMISSIONS_KEY, permissions);
