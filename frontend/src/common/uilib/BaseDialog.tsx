import { ReactNode, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import IconButton from "./IconButton";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  show: boolean;
  children: ReactNode;
  title?: string;
  onClose?: () => void;
  size?: "xs" | "sm" | "md" | "lg";
}

export default function BaseDialog(props: Props) {
  const { show, children, onClose, title, size = "md" } = props;

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

  const portal = document.getElementById("portal");

  if (portal) {
    return show
      ? createPortal(
          <dialog
            className={classNames(
              "w-screen h-screen z-10",
              "fixed top-0 left-0",
              "bg-gray-900/60",
              "flex justify-center items-center"
            )}
          >
            <div
              className={classNames(
                "flex flex-col justify-start items-stretch gap-2",
                "bg-white dark:bg-slate-800",
                "w-full drop-shadow",
                { "max-w-screen-xs": size === "xs" },
                { "max-w-screen-sm": size === "sm" },
                { "max-w-screen-md": size === "md" },
                { "max-w-screen-lg": size === "lg" },
                "font-inter text-primary bg-white dark:text-white dark:bg-slate-800",
                "border border-slate-200 dark:border-slate-700",
                "rounded-md overflow-auto"
              )}
            >
              {onClose && (
                <div
                  className={classNames(
                    "w-full flex flex-row items-start p-3 pb-0",
                    { "justify-end": !title },
                    { "justify-between": title }
                  )}
                >
                  {title && <h1 className="text-lg font-bold">{title}</h1>}
                  <IconButton onClick={onClose}>
                    <XMarkIcon className="h-6 w-6" />
                  </IconButton>
                </div>
              )}
              {children}
            </div>
          </dialog>,
          portal
        )
      : null;
  } else {
    return null;
  }
}
