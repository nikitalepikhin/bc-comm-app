import classNames from "classnames";
import React from "react";

interface Props {
  text: string;
  active: boolean;
}

export default function ComboboxOption(props: Props) {
  const { text, active } = props;

  return (
    <div
      className={classNames(
        "px-3 py-2 truncate",
        "border border-transparent border-l-0 border-r-0",
        "hover:bg-blue-50 hover:first:border-t-transparent hover:last:border-b-transparent hover:border-t-slate-200 hover:border-b-slate-200",
        "hover:dark:bg-blue-600/50 hover:first:border-t-transparent hover:last:border-b-transparent hover:dark:border-t-slate-700 hover:dark:border-b-slate-700",
        {
          "bg-blue-50 first:border-t-transparent last:border-b-transparent border-t-slate-200 border-b-slate-200":
            active,
        },
        {
          "dark:bg-blue-600/50 first:border-t-transparent last:border-b-transparent dark:border-t-slate-700 dark:border-b-slate-700":
            active,
        }
      )}
    >
      {text}
    </div>
  );
}
