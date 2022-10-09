import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Box(props: Props) {
  const { children, className } = props;

  return (
    <div
      className={classNames(
        "bg-white dark:bg-gray-800",
        "p-3 rounded-md",
        "shadow",
        "border border-slate-200 dark:border-slate-700",
        "overflow-auto",
        {
          [`${className}`]: className !== undefined,
        }
      )}
    >
      {children}
    </div>
  );
}
