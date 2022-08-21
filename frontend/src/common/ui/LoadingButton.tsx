import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import classNames from "classnames";

interface LoadingButtonPropsType {
  loading: boolean;
  className?: string;
  color?: string;
  hoverColor?: string;
  disabled?: boolean;
  onClick: () => void;
}

const LoadingButton: React.FC<LoadingButtonPropsType> = ({
  loading,
  disabled = false,
  className,
  onClick,
  children,
}) => {
  return (
    <button
      className={classNames(
        className,
        "inline-flex items-center gap-2",
        "px-4 py-1.5 text-accent bg-transparent border-2 border-accent hover:border-accent-strong hover:text-accent-strong rounded-md w-fit",
        "disabled:border-secondary disabled:hover:border-secondary disabled:text-secondary disabled:hover:text-secondary"
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <LoadingSpinner size="h-4 w-4" border="border-2" color="border-secondary" />}
      {children}
    </button>
  );
};

export default LoadingButton;
