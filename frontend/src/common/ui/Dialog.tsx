import { useLayoutEffect } from "react";
import Button from "./Button";
import { createPortal } from "react-dom";
import Container from "./Container";
import classNames from "classnames";
import { XMarkIcon } from "@heroicons/react/20/solid";

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
                "font-inter text-primary bg-slate-100 dark:text-white dark:bg-slate-900"
              )}
            >
              {onClose && (
                <Button className="absolute top-2 right-3 bg-white" onClick={onClose}>
                  <XMarkIcon className="text-primary h-4 w-4" />
                </Button>
              )}
              <Container
                title={title}
                actions={
                  <>
                    <Button onClick={onCancel}>{cancelText ?? "Cancel"}</Button>
                    <Button onClick={onConfirm} loading={loading} variant={danger ? "danger" : "accent"}>
                      {confirmText ?? "Confirm"}
                    </Button>
                  </>
                }
              >
                {body}
              </Container>
            </div>
          </dialog>,
          mountPoint
        )
      : null;
  } else {
    return null;
  }
}
