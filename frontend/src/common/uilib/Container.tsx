import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
  danger?: boolean;
  className?: string;
}
export default function Container(props: Props) {
  const { title, children, actions, danger, className } = props;
  return (
    <div
      className={classNames(
        "bg-white dark:bg-slate-800",
        "rounded-md",
        "shadow dark:shadow-gray-800",
        "border",
        { "border-slate-200 dark:border-slate-700": !danger },
        { "border-red-600 dark:border-red-700": danger },
        "overflow-auto",
        { [`${className}`]: className }
      )}
    >
      {title && (
        <div
          className={classNames(
            "px-3 py-3",
            "text-lg font-bold",
            "border border-x-0 border-t-0",
            { "border-b-slate-200 dark:border-b-slate-700": !danger },
            { "border-b-red-600 dark:border-b-red-700 text-red-600 dark:text-red-200": danger },
            "align-middle",
            "overflow-auto w-full",
            { "bg-slate-100 dark:bg-slate-900": !danger },
            { "bg-red-100 dark:bg-red-900": danger }
          )}
        >
          {title}
        </div>
      )}
      <div className={classNames("px-3 pb-3 my-2", { "pt-3": title === undefined })}>{children}</div>
      {actions && (
        <div
          className={classNames(
            "bg-slate-50 dark:bg-slate-900",
            "px-3 py-3",
            "flex flex-row justify-end items-center gap-2 flex-wrap"
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
