import React, { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export default function IconButton(props: Props) {
  const { disabled, onClick, children, className } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "rounded-md",
        "focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
        { [`${className}`]: className !== undefined }
      )}
    >
      {children}
    </button>
  );
}
