import classNames from "classnames";
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import IconButton from "./IconButton";

interface Props {
  show: boolean;
  children: string;
  severity?: "error" | "warning" | "info" | "success";
  fullWidth?: boolean;
  title?: string;
  onClose?: () => void;
  font?: "sm" | "base";
}

export default function Alert(props: Props) {
  const { show, children, title, onClose, severity = "error", fullWidth = false, font = "base" } = props;
  return show ? (
    <div
      className={classNames(
        "flex flex-row justify-start items-center gap-4",
        "rounded-md border p-1.5",
        "shadow dark:shadow-gray-800",
        { "w-full": fullWidth },
        { "w-fit": !fullWidth },
        { "text-sm": font === "sm" },
        { "text-base": font === "base" },
        {
          "border-red-200 dark:border-red-700 bg-red-100 dark:bg-red-800/50 text-red-900 dark:text-red-300":
            severity === "error",
        },
        {
          "border-amber-200 dark:border-amber-700 bg-amber-100 dark:bg-amber-800/50 text-amber-900 dark:text-amber-300":
            severity === "warning",
        },
        {
          "border-slate-200 dark:border-slate-700 dark:border-slate-700 bg-slate-100 dark:bg-slate-700/50 text-slate-900 dark:text-slate-300":
            severity === "info",
        },
        {
          "border-lime-200 dark:border-lime-700 bg-lime-100 dark:bg-lime-800/50 text-lime-900 dark:text-slate-300":
            severity === "success",
        }
      )}
    >
      <div
        className={classNames(
          "rounded-full",
          { "bg-red-400/30 dark:bg-red-800/50": severity === "error" },
          { "bg-amber-400/30 dark:bg-amber-800/50": severity === "warning" },
          { "bg-slate-400/30 dark:bg-slate-700/50": severity === "info" },
          { "bg-lime-400/30 dark:bg-lime-800/50": severity === "success" },
          { "p-1.5": title },
          { "p-1": !title }
        )}
      >
        {severity === "error" && (
          <ExclamationTriangleIcon
            className={classNames({ "h-10 w-10": title }, { "h-5 w-5": !title }, "text-red-600 dark:text-red-400")}
          />
        )}
        {severity === "warning" && (
          <ExclamationTriangleIcon
            className={classNames({ "h-10 w-10": title }, { "h-5 w-5": !title }, "text-amber-600 dark:text-amber-400")}
          />
        )}
        {severity === "success" && (
          <CheckCircleIcon
            className={classNames({ "h-10 w-10": title }, { "h-5 w-5": !title }, "text-lime-600 dark:text-lime-400")}
          />
        )}
        {severity === "info" && (
          <InformationCircleIcon
            className={classNames({ "h-10 w-10": title }, { "h-5 w-5": !title }, "text-slate-600 dark:text-slate-400")}
          />
        )}
      </div>
      <div className="flex flex-col justify-start items-start">
        {title && severity === "error" && <div className="text-lg font-bold text-red-600">{title ?? "Error"}</div>}
        {title && severity === "warning" && (
          <div className="text-lg font-bold text-amber-600">{title ?? "Warning"}</div>
        )}
        {title && severity === "info" && <div className="text-lg font-bold text-slate-600">{title ?? "Info"}</div>}
        {title && severity === "success" && <div className="text-lg font-bold text-lime-600">{title ?? "Success"}</div>}
        <div className="break-words">{children}</div>
      </div>
      {onClose && (
        <div className="self-start ml-auto">
          <IconButton onClick={onClose}>
            <XMarkIcon
              className={classNames(
                "h-5 w-5",
                {
                  "text-red-800": severity === "error",
                },
                {
                  "text-amber-800": severity === "warning",
                },
                {
                  "text-lime-800": severity === "success",
                },
                {
                  "text-slate-800": severity === "info",
                }
              )}
            />
          </IconButton>
        </div>
      )}
    </div>
  ) : null;
}
