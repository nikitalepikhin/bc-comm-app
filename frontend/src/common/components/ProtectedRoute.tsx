import React from "react";
import { RoleType } from "../../features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import { Navigate } from "react-router-dom";

interface ProtectedRoutePropsType {
  allowedRoles: RoleType[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRoutePropsType> = ({ allowedRoles, children }) => {
  const {
    present,
    user: { role },
  } = useAppSelector((state) => state.auth);

  return !present || role === undefined || !allowedRoles.includes(role) ? <Navigate to="/" replace /> : <>{children}</>;
};

export default ProtectedRoute;
