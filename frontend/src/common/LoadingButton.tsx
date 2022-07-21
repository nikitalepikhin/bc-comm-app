import React from "react";
import { CircularProgress } from "@mui/material";

interface LoadingButtonPropsType {
  loading: boolean;
  className: string;
  onClick: () => void;
  loadingIconSize?: number;
}

const LoadingButton: React.FC<LoadingButtonPropsType> = ({
  loading,
  className,
  onClick,
  loadingIconSize = 20,
  children,
}) => {
  return loading ? (
    <CircularProgress size={loadingIconSize} />
  ) : (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default LoadingButton;
