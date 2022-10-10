import { useLayoutEffect } from "react";
import Button from "./Button";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ExclamationTriangleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import IconButton from "./IconButton";

interface Props {
  show: boolean;
  title?: string;
  body?: string;
  size?: "xs" | "sm" | "md" | "lg";
  onConfirm: () => void;
  confirmText?: string;
  danger?: boolean;
  onClose?: () => void;
  onCancel: () => void;
  cancelText?: string;
  loading?: boolean;
}

export default function Dialog(props: Props) {
  const {
    show,
    title,
    body,
    size = "md",
    onCancel,
    onClose,
    cancelText,
    onConfirm,
    confirmText,
    danger = false,
    loading = false,
  } = props;

  useLayoutEffect(() => {
    const domBody = document.querySelector("body");
    if (show) {
      if (domBody) {
        domBody.style.overflowY = "hidden";
      }
    }
    return () => {
      if (domBody) {
        domBody.style.overflowY = "";
      }
    };
  }, [show]);

  // todo icon button

  const mountPoint = document.getElementById("portal");

  if (mountPoint) {
    return show
      ? createPortal(
          <dialog
            className={classNames(
              "flex justify-center items-center",
              "w-screen h-screen",
              "fixed top-0 left-0 z-50",
              "bg-slate-900/80 dark:bg-slate-900/90"
            )}
          >
            <div
              className={classNames(
                "w-full",
                { "max-w-screen-xs": size === "xs" },
                { "max-w-screen-sm": size === "sm" },
                { "max-w-screen-md": size === "md" },
                { "max-w-screen-lg": size === "lg" },
                "relative overflow-auto rounded-md",
                "font-inter text-primary bg-white dark:text-white dark:bg-slate-800",
                "flex flex-col justify-start items-stretch",
                "border border-slate-200 dark:border-slate-700"
              )}
            >
              <div className="flex flex-row justify-start items-start gap-4 p-3">
                <div>
                  <div
                    className={classNames(
                      "rounded-full p-1.5",
                      { "bg-red-200/50 dark:bg-red-200/80": danger },
                      { "bg-blue-200/50 dark:bg-blue-200/80": !danger }
                    )}
                  >
                    {danger && <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />}
                    {!danger && <QuestionMarkCircleIcon className="h-8 w-8 text-blue-600" />}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-stretch gap-2">
                  <div className={classNames("text-lg font-bold")}>{title}</div>
                  <div className={classNames("text-base text-secondary")}>{body}</div>
                </div>
                {onClose && (
                  <div className="ml-auto">
                    <IconButton onClick={onClose}>
                      <XMarkIcon className="text-primary h-5 w-5" />
                    </IconButton>
                  </div>
                )}
              </div>
              <div
                className={classNames(
                  "flex flex-row justify-end items-center gap-2",
                  "bg-slate-50 dark:bg-slate-900",
                  "p-2"
                )}
              >
                <Button onClick={onCancel}>{cancelText ?? "Cancel"}</Button>
                <Button onClick={onConfirm} loading={loading} variant={danger ? "danger" : "accent"}>
                  {confirmText ?? "Confirm"}
                </Button>
              </div>
            </div>
          </dialog>,
          mountPoint
        )
      : null;
  } else {
    return null;
  }
}
