import { useEffect, useLayoutEffect, useState } from "react";
import Button from "./Button";

interface Props {
  show: boolean;
  title?: string;
  body?: string;
  onConfirm?: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
}

export default function Dialog(props: Props) {
  const { show, title, body, onCancel, cancelText, onConfirm, confirmText } = props;

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

  // todo - add dialog sizing

  return show ? (
    <dialog className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 z-20 bg-primary/80">
      <div className="flex flex-col justify-start items-center bg-white rounded-md px-4 py-2 max-w-screen-md w-full shadow">
        <div className="text-lg font-bold w-full">{title}</div>
        <div>{body}</div>
        <div className="flex flex-row justify-end items-center flex-wrap gap-2 w-full">
          <Button onClick={onCancel}>{cancelText ?? "Cancel"}</Button>
          <Button onClick={onConfirm}>{confirmText ?? "Confirm"}</Button>
        </div>
      </div>
    </dialog>
  ) : null;
}
