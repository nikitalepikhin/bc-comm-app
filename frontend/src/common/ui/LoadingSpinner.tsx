import React from "react";
import classNames from "classnames";

interface Props {
  color?: string;
  size?: string;
  border?: string;
  children?: string;
}

export default function LoadingSpinner(props: Props) {
  const { color, size, border, children } = props;
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div
        className={classNames(
          `${size ?? "h-6 w-6"} ${border ?? "border-4"} border-solid ${
            color ?? "border-accent"
          } border-t-transparent rounded-full animate-spin`
        )}
      ></div>
      {children}
    </div>
  );
}
