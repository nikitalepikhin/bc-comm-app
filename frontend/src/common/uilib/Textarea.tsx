import { FormikHandlers } from "formik";
import classNames from "classnames";
import { ForwardedRef, forwardRef } from "react";

interface Props {
  name: string;
  value: string | undefined;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
  error?: string;
  disabled?: boolean;
  labelValue?: string;
  placeholder?: string;
  fullWidth?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
  resize?: boolean;
  className?: string;
}

function Textarea(props: Props, ref: ForwardedRef<HTMLTextAreaElement>) {
  const {
    name,
    value,
    onChange,
    onBlur,
    error,
    disabled = false,
    labelValue,
    placeholder,
    fullWidth = false,
    maxLength,
    showCharCount,
    size = "xs",
    resize = false,
    className,
  } = props;
  return (
    <div
      className={classNames(
        "flex flex-col justify-start items-start gap-1",
        { "w-full": fullWidth },
        { "w-96": !fullWidth },
        {
          [`${className}`]: className !== undefined,
        }
      )}
    >
      {labelValue && (
        <label
          htmlFor={`textarea-${name}`}
          className={classNames(
            { "text-slate-700 dark:text-slate-200": !disabled },
            { "text-slate-400 dark:text-slate-600": disabled }
          )}
        >
          {labelValue}
        </label>
      )}
      <textarea
        id={`textarea-${name}`}
        ref={ref}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className={classNames(
          "overflow-auto border w-full",
          { "h-[70px]": size === "xxs" },
          { "h-[100px]": size === "xs" },
          { "h-[200px]": size === "sm" },
          { "h-[400px]": size === "md" },
          { "h-[600px]": size === "lg" },
          { "h-[800px]": size === "xl" },
          { "resize-none": !resize },
          { "resize-y": resize },
          "rounded-md px-3 py-2",
          "text-primary dark:text-white",
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
      />
      {showCharCount && value && (
        <div className="self-end text-sm text-secondary">{`${value?.length}${maxLength ? " / " : ""}${
          maxLength ? maxLength : ""
        }`}</div>
      )}
      {error && <div className={classNames("text-sm text-red-600")}>{error}</div>}
    </div>
  );
}

export default forwardRef(Textarea);
