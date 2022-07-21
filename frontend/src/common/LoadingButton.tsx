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
  return (
    <button className={className} onClick={onClick}>
      {loading ? <CircularProgress size={loadingIconSize} /> : children}
    </button>
  );
};

export default LoadingButton;
