import React, { ForwardedRef, forwardRef, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  className?: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  textSize?: "small" | "base";
  variant?: "default" | "standard" | "danger" | "default-danger" | "accent";
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

function Button(props: Props, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    className,
    type = "submit",
    variant = "default",
    loading = false,
    textSize = "small",
    disabled = false,
    icon,
    onClick = () => {},
    children,
  } = props;

  switch (variant) {
    case "accent":
    case "danger":
      return (
        <button
          ref={ref}
          type={type}
          disabled={disabled || loading}
          onClick={onClick}
          className={classNames(
            "text-sm text-white text-center",
            { "bg-blue-600 hover:bg-blue-700": variant === "accent" },
            { "focus:ring-blue-600/50 dark:focus:ring-offset-slate-800": variant === "accent" },
            { "disabled:bg-blue-900 disabled:hover:bg-blue-900": variant === "accent" },
            { "bg-red-600 hover:bg-red-700": variant === "danger" },
            { "focus:ring-red-600/50 dark:focus:ring-offset-red-800": variant === "danger" },
            { "disabled:bg-red-900 disabled:hover:bg-red-900": variant === "danger" },
            "border border-slate-200 dark:border-slate-700",
            "rounded-md",
            "py-2 px-3",
            "focus:ring-2 focus:ring-offset-1 focus:outline-none",
            { "text-sm": textSize === "small" },
            { "text-base": textSize === "base" },
            "flex justify-center items-center gap-1.5",
            "disabled:text-slate-400 disabled:dark:text-slate-500",
            { [`${className}`]: className !== undefined }
          )}
        >
          {children}
          {icon}
          {loading && <LoadingSpinner size="h-4 w-4" border="border-2" color="border-slate-400 dark:text-slate-400" />}
        </button>
      );
    case "standard":
      return (
        <button
          ref={ref}
          type={type}
          disabled={disabled || loading}
          onClick={onClick}
          className={classNames(
            "text-sm text-center text-slate-900 hover:text-slate-700 dark:text-white dark:hover:text-slate-300",
            "hover:bg-slate-100 hover:dark:bg-slate-900 border border-transparent hover:border-slate-200 hover:dark:border-slate-700",
            "hover:disabled:bg-transparent hover:disabled:border-transparent hover:disabled:dark:bg-transparent hover:disabled:dark:border-transparent",
            "py-2 px-3 rounded-md",
            "focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
            "focus:outline-none",
            { "text-sm": textSize === "small" },
            { "text-base": textSize === "base" },
            "flex justify-center items-center gap-1.5",
            "disabled:text-slate-400 disabled:hover:text-slate-400 disabled:dark:text-slate-400 disabled:hover:dark:text-slate-400",
            { [`${className}`]: className !== undefined }
          )}
        >
          {children}
          {icon}
          {loading && <LoadingSpinner size="h-4 w-4" border="border-2" color="border-slate-400 dark:text-slate-400" />}
        </button>
      );
    case "default":
    default:
      return (
        <button
          ref={ref}
          type={type}
          disabled={disabled || loading}
          onClick={onClick}
          className={classNames(
            "text-sm text-center text-primary dark:text-white",
            "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800",
            "border border-slate-200 dark:border-slate-700",
            "rounded-md",
            "py-2 px-3",
            "focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
            { "text-sm": textSize === "small" },
            { "text-base": textSize === "base" },
            "flex justify-center items-center gap-1.5",
            "disabled:text-slate-400 disabled:hover:bg-white disabled:dark:text-slate-500 disabled:hover:dark:bg-slate-900",
            { [`${className}`]: className !== undefined }
          )}
        >
          {children}
          {icon}
          {loading && (
            <LoadingSpinner size="h-4 w-4" border="border-2" color="border-slate-400 dark:border-slate-500" />
          )}
        </button>
      );
  }
}

export default forwardRef(Button);
