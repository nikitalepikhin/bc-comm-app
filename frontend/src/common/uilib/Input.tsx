import classNames from "classnames";
import { FormikHandlers } from "formik";
import { ForwardedRef, forwardRef } from "react";

interface Props {
  name: string;
  value: string | number | readonly string[] | undefined;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
  error?: string;
  disabled?: boolean;
  labelValue?: string;
  placeholder?: string;
  type?: "text" | "password" | "tel" | "number";
  fullWidth?: boolean;
  className?: string;
}

function Input(props: Props, ref: ForwardedRef<HTMLInputElement>) {
  const {
    className,
    name,
    value,
    onChange,
    onBlur,
    error,
    disabled = false,
    labelValue,
    placeholder,
    type = "text",
    fullWidth = false,
  } = props;
  return (
    <div
      className={classNames(
        "flex flex-col justify-start items-start gap-1",
        { "w-full": fullWidth },
        { "w-fit": !fullWidth },
        { [`${className}`]: className !== undefined }
      )}
    >
      {labelValue && (
        <label
          htmlFor={`input-${name}`}
          className={classNames(
            { "text-slate-700 dark:text-slate-200": !disabled },
            { "text-slate-400 dark:text-slate-600": disabled }
          )}
        >
          {labelValue}
        </label>
      )}
      <input
        id={`input-${name}`}
        ref={ref}
        className={classNames(
          "w-full border",
          "rounded-md px-3 py-2",
          "text-primary dark:text-white disabled:text-secondary disabled:dark:text-slate-400",
          { "bg-white dark:bg-slate-900": !disabled },
          { "bg-slate-50 dark:bg-slate-800 placeholder-slate-300 dark:placeholder-slate-700": disabled },
          "focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
          {
            "focus:ring-blue-600/50 border-slate-200 dark:border-slate-700 focus:border-slate-200 focus:dark:border-slate-700":
              !error,
          },
          {
            "focus:ring-red-600/50 border-red-600 focus:border-red-600 dark:border-red-600/50 focus:dark:border-red-600/50":
              error,
          }
        )}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <div className={classNames("text-sm text-red-600")}>{error}</div>}
    </div>
  );
}

export default forwardRef(Input);
