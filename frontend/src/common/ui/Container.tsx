import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  title?: string;
  children: ReactNode;
  actions: ReactNode;
}
export default function Container(props: Props) {
  const { title, children, actions } = props;
  return (
    <div
      className={classNames(
        "bg-white dark:bg-slate-800",
        "rounded-md",
        "shadow",
        "border border-slate-200 dark:border-slate-700",
        "overflow-auto"
      )}
    >
      {title && (
        <div
          className={classNames(
            "px-3 py-3 mb-2",
            "text-lg font-bold",
            "border border-b-slate-200 dark:border-b-slate-700 border-x-0 border-t-0",
            "align-middle",
            "overflow-auto"
          )}
        >
          {title}
        </div>
      )}
      <div className={classNames("px-3 pb-3 my-2", { "pt-3": title === undefined })}>{children}</div>
      <div
        className={classNames(
          "bg-slate-50 dark:bg-slate-900",
          "px-3 py-3",
          "flex flex-row justify-end items-center gap-2 flex-wrap"
        )}
      >
        {actions}
      </div>
    </div>
  );
}
