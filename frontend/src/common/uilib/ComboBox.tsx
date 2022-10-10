import { Combobox } from "@headlessui/react";
import React, { useCallback, useState } from "react";
import { debounce } from "lodash";
import LoadingSpinner from "./LoadingSpinner";

export interface ComboBoxState {
  text: string;
  value: string;
}

interface Props {
  initialState?: ComboBoxState;
  name: string;
  loading?: boolean;
  onChange: (value: ComboBoxState | null) => void;
  onInputChange: (value: string) => void;
  options: ComboBoxState[];
  wait?: number;
  disabled?: boolean;
  dependencies?: any[];
  placeholder?: string;
  resetOnChange?: boolean;
}

const ComboBox: React.FC<Props> = ({
  initialState = null,
  name,
  placeholder,
  loading = false,
  onChange,
  onInputChange,
  options,
  wait = 0,
  disabled = false,
  resetOnChange = false,
  dependencies = [],
}) => {
  const [state, setState] = useState<ComboBoxState | null>(initialState);

  const debouncedOnInputChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      onInputChange(event.target.value);
    }, wait),
    [wait, ...dependencies]
  );

  return (
    <Combobox
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
      {(props) => (
        <>
          <Combobox.Input
            name={name}
            placeholder={placeholder}
            onChange={(event) => {
              if (event.target.value.length > 0) {
                debouncedOnInputChange(event);
              }
            }}
            displayValue={(state: ComboBoxState) => state?.text}
          />
          {loading && <LoadingSpinner />}
          {state !== undefined && (
            <button
              type="button"
              onClick={() => {
                setState(null);
                onChange(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
          <Combobox.Options>
            {options.map((option) => (
              <Combobox.Option key={option.value} value={option}>
                {option.text}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </>
      )}
    </Combobox>
  );
};

export default ComboBox;
