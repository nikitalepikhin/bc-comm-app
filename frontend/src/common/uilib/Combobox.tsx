import { Combobox as HeadlessCombobox } from "@headlessui/react";
import React, { Fragment, useCallback, useState } from "react";
import { debounce } from "lodash";
import LoadingSpinner from "./LoadingSpinner";
import classNames from "classnames";
import IconButton from "./IconButton";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { stat } from "fs";

export interface ComboBoxState {
  text: string;
  value: string;
}

interface Props {
  initialState?: ComboBoxState;
  name: string;
  labelValue?: string;
  loading?: boolean;
  isUninitialized?: boolean;
  onChange: (value: ComboBoxState | null) => void;
  onInputChange: (value: string) => void;
  options: ComboBoxState[];
  error?: string;
  wait?: number;
  disabled?: boolean;
  dependencies?: any[];
  placeholder?: string;
  resetOnChange?: boolean;
}

export default function Combobox(props: Props) {
  const {
    initialState = null,
    name,
    labelValue,
    placeholder,
    loading = false,
    isUninitialized,
    onChange,
    onInputChange,
    options,
    error,
    wait = 0,
    disabled = false,
    resetOnChange = false,
    dependencies = [],
  } = props;

  const [state, setState] = useState<ComboBoxState | null>(initialState);

  const debouncedOnInputChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      onInputChange(event.target.value);
    }, wait),
    [wait, ...dependencies]
  );

  return (
    <div className={classNames("flex flex-col justify-start items-start gap-1 w-full")}>
      {labelValue && (
        <label
          htmlFor={`combobox-${name}`}
          className={classNames(
            { "text-slate-700 dark:text-slate-200": !disabled },
            { "text-slate-400 dark:text-slate-600": disabled }
          )}
        >
          {labelValue}
        </label>
      )}
      <HeadlessCombobox
        value={state}
        disabled={disabled}
        nullable
        onChange={(value) => {
          setState(value);
          onChange(value ?? null);
          if (resetOnChange) {
            setState(null);
          }
        }}
      >
        <div className="relative w-full">
          <HeadlessCombobox.Input
            id={`combobox-${name}`}
            name={name}
            placeholder={placeholder}
            onChange={(event) => debouncedOnInputChange(event)}
            displayValue={(state: ComboBoxState) => state?.text}
            className={classNames(
              "w-full border",
              "rounded-md px-3 py-2",
              { "pr-10": state !== null && !loading },
              { "pr-20": state !== null && loading },
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
          {loading && (
            <LoadingSpinner
              size="h-5 w-5"
              color="border-slate-400 dark:border-slate-500"
              className={classNames(
                "absolute top-[0.7rem]",
                { "right-3": state === null },
                { "right-12": state !== null }
              )}
            />
          )}
          {state && (
            <IconButton
              className="absolute top-[0.7rem] right-3 text-slate-400 dark:text-slate-500 hover:text-slate-500 hover:dark:text-slate-400 transition-all"
              onClick={() => {
                setState(null);
                onChange(null);
              }}
            >
              <XMarkIcon className="h-5 w-5" />
            </IconButton>
          )}

          <HeadlessCombobox.Options
            as="div"
            className={classNames(
              "bg-white dark:bg-slate-900",
              "border border-slate-200 dark:border-slate-700",
              "max-h-72 overflow-auto w-full",
              "my-2 rounded-md shadow",
              "absolute top-10 z-50",
              { hidden: options.length === 0 && loading }
            )}
          >
            {options.length > 0 &&
              !loading &&
              options.map((option) => (
                <HeadlessCombobox.Option key={option.value} value={option} as={Fragment}>
                  {({ active }) => (
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
                      {option.text}
                    </div>
                  )}
                </HeadlessCombobox.Option>
              ))}
            {options.length === 0 && !loading && isUninitialized !== undefined && !isUninitialized && (
              <div className="px-3 py-2 truncate">Nothing found</div>
            )}
          </HeadlessCombobox.Options>
        </div>
      </HeadlessCombobox>
      {error && <div className={classNames("text-sm text-red-600")}>{error}</div>}
    </div>
  );
}
