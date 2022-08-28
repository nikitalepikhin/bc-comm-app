import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import Button, { ButtonPropsType } from "../components/Button";
import classNames from "classnames";

interface LoadingButtonPropsType extends ButtonPropsType {
  loading: boolean;
}

const LoadingButton: React.FC<LoadingButtonPropsType> = ({
  type = "submit",
  variant = "outlined",
  loading,
  disabled = false,
  className = "",
  onClick,
  children,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      variant={variant}
      className={classNames(className, "flex flex-row justify-center items-center gap-2")}
    >
      {loading && <LoadingSpinner size="h-4 w-4" border="border-2" color="border-secondary" />}
      {children}
    </Button>
  );
};

export default LoadingButton;
