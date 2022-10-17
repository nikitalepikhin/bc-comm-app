import Button from "./Button";
import classNames from "classnames";
import { ExclamationTriangleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import BaseDialog from "./BaseDialog";

interface Props {
  show: boolean;
  title?: string;
  body?: string;

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
    onCancel,
    onClose,
    cancelText,
    onConfirm,
    confirmText,
    danger = false,
    loading = false,
  } = props;

  return (
    <BaseDialog show={show} onClose={onClose}>
      <div className={classNames("relative", "flex flex-col justify-start items-stretch")}>
        <div className="flex flex-row justify-start items-start gap-4 p-3">
          <div>
            <div
              className={classNames(
                "rounded-full p-1.5",
                { "bg-red-400/30 dark:bg-red-800/50": danger },
                { "bg-blue-400/30 dark:bg-blue-800/50": !danger }
              )}
            >
              {danger && <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />}
              {!danger && <QuestionMarkCircleIcon className="h-8 w-8 text-blue-600" />}
            </div>
          </div>
          <div className="flex flex-col justify-start items-stretch gap-2">
            <div className={classNames("text-lg font-bold")}>{title}</div>
            <div className={classNames("text-base text-secondary dark:text-slate-400")}>{body}</div>
          </div>
        </div>
        <div
          className={classNames("flex flex-row justify-end items-center gap-2", "bg-slate-50 dark:bg-slate-900", "p-2")}
        >
          <Button onClick={onCancel}>{cancelText ?? "Cancel"}</Button>
          <Button onClick={onConfirm} loading={loading} variant={danger ? "danger" : "accent"}>
            {confirmText ?? "Confirm"}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
