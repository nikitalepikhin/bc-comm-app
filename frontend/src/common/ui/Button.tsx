import React from "react";
import classNames from "classnames";

export interface ButtonPropsType {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "outlined" | "contained" | "standard";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonPropsType> = ({
  className = "",
  type = "submit",
  variant = "outlined",
  disabled = false,
  onClick = () => {},
  children,
}) => {
  switch (variant) {
    case "outlined":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={classNames(
            className,
            "px-4 py-1.5 rounded-md disabled:cursor-default",
            "text-accent hover:text-accent-strong disabled:text-secondary disabled:hover:text-secondary",
            "border-2 border-accent hover:border-accent-strong disabled:border-secondary disabled:hover:border-secondary",
            "bg-transparent"
          )}
        >
          {children}
        </button>
      );
    case "contained":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={classNames(
            className,
            "px-4 py-1.5 rounded-md disabled:cursor-default",
            "text-white hover:text-white disabled:text-white disabled:hover:text-white",
            "border-2 border-accent hover:border-accent-strong disabled:border-secondary disabled:hover:border-secondary",
            "bg-accent hover:bg-accent-strong disabled:bg-secondary disabled:hover:bg-secondary"
          )}
        >
          {children}
        </button>
      );
    case "standard":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={classNames(
            className,
            "px-4 py-1.5 rounded-md disabled:cursor-default",
            "text-accent hover:text-accent-strong disabled:text-secondary disabled:hover:text-secondary",
            "border-2 border-transparent"
          )}
        >
          {children}
        </button>
      );
  }
};

export default Button;
