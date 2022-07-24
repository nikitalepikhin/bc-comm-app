import React from "react";

interface LoadingButtonPropsType {
  loading: boolean;
  className: string;
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
    <button className={className} onClick={onClick} disabled={disabled}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default LoadingButton;
