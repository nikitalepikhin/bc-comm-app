import React from "react";
import classNames from "classnames";

interface Props {
  color?: string;
  size?: string;
  border?: string;
  children?: string;
  className?: string;
  textClassName?: string;
}

export default function LoadingSpinner(props: Props) {
  const { color, size, border, children, className, textClassName } = props;
  return (
    <div
      className={classNames("flex flex-col justify-center items-center gap-2", {
        [`${textClassName}`]: textClassName !== undefined,
      })}
    >
      <div
        className={classNames(
          { "h-6 w-6": size === undefined },
          { [`${size}`]: size !== undefined },
          { "border-2": border === undefined },
          { [`${border}`]: border !== undefined },
          { "border-primary dark:border-white": color === undefined },
          { [`${color}`]: color !== undefined },
          "border-solid border-t-transparent dark:border-t-transparent rounded-full animate-spin",
          { [`${className}`]: className !== undefined }
        )}
      />
      {children}
    </div>
  );
}
