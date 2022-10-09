import classNames from "classnames";
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import IconButton from "./IconButton";
import { useState } from "react";

interface Props {
  severity?: "error" | "warning" | "info" | "success";
  fullWidth?: boolean;
  children: string;
}

export default function Alert(props: Props) {
  const { children, severity = "error", fullWidth = false } = props;
  const [showing, setShowing] = useState(true);
  return showing ? (
    <div
      className={classNames(
        "flex flex-row justify-start items-center gap-4",
        "rounded-md p-3 border",
        { "w-full": fullWidth },
        { "w-fit": !fullWidth },
        {
          "border-red-600 bg-red-100/50 text-red-900": severity === "error",
        },
        {
          "border-amber-600 bg-amber-100/50 text-amber-900": severity === "warning",
        },
        {
          "border-slate-600 bg-slate-100/50 text-slate-900": severity === "info",
        },
        {
          "border-lime-600 bg-lime-100/50 text-lime-900": severity === "success",
        }
      )}
    >
      <div
        className={classNames(
          "rounded-full p-2",
          { "bg-red-400/30": severity === "error" },
          { "bg-amber-400/30": severity === "warning" },
          { "bg-slate-400/30": severity === "info" },
          { "bg-lime-400/30": severity === "success" }
        )}
      >
        {(severity === "error" || severity === "warning") && (
          <ExclamationTriangleIcon
            className={classNames(
              "h-10 w-10",
              { "text-red-600": severity === "error" },
              { "text-amber-600": severity === "warning" }
            )}
          />
        )}
        {severity === "success" && <CheckCircleIcon className={classNames("h-10 w-10 text-lime-600")} />}
        {severity === "info" && <InformationCircleIcon className={classNames("h-10 w-10 text-slate-600")} />}
      </div>
      <div className="flex flex-col justify-start items-start">
        {severity === "error" && <div className="text-lg font-bold text-red-600">Error</div>}
        {severity === "warning" && <div className="text-lg font-bold text-amber-600">Warning</div>}
        {severity === "info" && <div className="text-lg font-bold text-slate-600">Info</div>}
        {severity === "success" && <div className="text-lg font-bold text-lime-600">Success</div>}
        <div>{children}</div>
      </div>
      <div className="self-start ml-auto">
        <IconButton onClick={() => setShowing(false)}>
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
    </div>
  ) : null;
}
