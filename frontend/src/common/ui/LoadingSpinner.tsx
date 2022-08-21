import React from "react";
import classNames from "classnames";

interface LoadingSpinnerPropsType {
  color?: string;
  size?: string;
  border?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerPropsType> = ({ color, size, border }) => {
  return (
    <div
      className={classNames(
        `${size ?? "h-6 w-6"} ${border ?? "border-4"} border-solid ${
          color ?? "border-accent"
        } border-t-transparent rounded-full animate-spin`
      )}
    ></div>
  );
};

export default LoadingSpinner;
