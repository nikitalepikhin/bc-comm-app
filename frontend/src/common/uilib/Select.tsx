import { FormikHandlers } from "formik";
import { ForwardedRef, forwardRef } from "react";
import classNames from "classnames";

export interface SelectOption {
  value: string | number;
  text: string;
}

interface Props {
  value: string | number | readonly string[] | undefined;
  options: SelectOption[];
  name?: string;
  onChange?: FormikHandlers["handleChange"];
  onBlur?: FormikHandlers["handleBlur"];
  labelValue?: string;
  display?: "row" | "col";
}

function Select(props: Props, ref: ForwardedRef<HTMLSelectElement>) {
  const { name, value, onChange, onBlur, options, labelValue, display } = props;

  return (
    <div
      className={classNames(
        "flex gap-2 w-full",
        { "flex-col justify-start items-start": display === undefined || display === "col" },
        { "flex-row justify-between items-center": display !== undefined || display === "row" }
      )}
    >
      {labelValue && <label htmlFor={`select-${name}`}>{labelValue}</label>}
      <select
        ref={ref}
        id={`select-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames(
          "block appearance-none leading-tight",
          "w-full rounded-md px-3 py-2 pr-8",
          "bg-white dark:bg-slate-900",
          "border border-slate-200 dark:border-slate-700",
          "focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
          "focus:ring-blue-600/50 border-slate-200 dark:border-slate-700 focus:border-slate-200 focus:dark:border-slate-700"
        )}
      >
        {options.map((opt, index) => (
          <option key={`page-opt-${index}`} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
