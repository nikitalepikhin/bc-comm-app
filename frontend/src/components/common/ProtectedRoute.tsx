import React, { ReactNode } from "react";
import { RoleType } from "../../app/redux/slice/authSlice";
import { useAppSelector } from "../../app/redux/hooks";
import { Navigate } from "react-router-dom";

interface Props {
  allowedRoles: RoleType[];
  children: ReactNode;
}

export default function ProtectedRoute(props: Props) {
  const { allowedRoles, children } = props;
  const {
    present,
    user: { role },
  } = useAppSelector((state) => state.auth);

  return !present || role === undefined || !allowedRoles.includes(role) ? <Navigate to="/" replace /> : <>{children}</>;
}
