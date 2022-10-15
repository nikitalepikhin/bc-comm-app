import { FormikHandlers } from "formik";
import classNames from "classnames";
import { CheckIcon } from "@heroicons/react/20/solid";

interface Props {
  name: string;
  value: string | number | readonly string[] | undefined;
  defaultValue: string;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
  options: { value: string | number; label: string }[];
  labelValue?: string;
}

export default function RadioGroup(props: Props) {
  const { name, value, onChange, onBlur, defaultValue, options, labelValue } = props;
  return (
    <div className="flex flex-col justify-start items-start gap-1 w-full">
      {labelValue && <div className="text-slate-700 dark:text-slate-200">{labelValue}</div>}
      <div
        className={classNames(
          "border border-slate-200 dark:border-slate-700",
          "rounded-md overflow-auto",
          "flex flex-col md:flex-row justify-between items-center w-full"
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`radio-${option.value}`}
            className={classNames(
              "w-full",
              "border border-slate-200 dark:border-slate-700 md:border-y-0 md:first:border-l-0 md:border-r-0 md:last:border-r-0",
              "border-x-0 first:border-t-0 border-b-0 last:border-b-0 md:border-x"
            )}
          >
            <input
              id={`radio-${option.value}`}
              type="radio"
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={option.value}
              className={classNames("hidden")}
            />
            <div
              className={classNames(
                { "bg-blue-100 dark:bg-blue-900": option.value === value },
                { "text-slate-700 dark:text-slate-300": option.value !== value },
                "px-3 py-2",
                "flex flex-row justify-center items-center gap-1"
              )}
            >
              <span className={classNames("text-center truncate")}>{option.label}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
