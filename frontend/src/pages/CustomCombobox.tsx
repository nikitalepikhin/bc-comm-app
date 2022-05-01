import { Combobox } from "@headlessui/react";
import classNames from "classnames";
import { FieldInputProps, FormikErrors, FormikTouched } from "formik";
import React, { useEffect, useState } from "react";
import { useGetAllMatchingSchoolsQuery } from "../app/api";
import { SchoolInputType } from "./SignupPage";
import { ChevronDownIcon, ChevronUpIcon, XIcon } from "@heroicons/react/outline";
import LoadingSpinner from "./LoadingSpinner";

interface CustomComboboxPropsType {
  setFieldValue: (value: SchoolInputType) => void;
  errors: FormikErrors<SchoolInputType> | undefined;
  touched: FormikTouched<SchoolInputType> | undefined;
  field: FieldInputProps<any>;
}

const CustomCombobox: React.FC<CustomComboboxPropsType> = ({ setFieldValue, errors, touched, field }) => {
  const [selectedOption, setSelectedOption] = useState<SchoolInputType | undefined>(undefined);
  const [matchingOptions, setMatchingOptions] = useState<SchoolInputType[]>([]);
  const { data, isLoading } = useGetAllMatchingSchoolsQuery({
    substring: field.value,
  });

  useEffect(() => {
    if (data && data.schools) {
      setMatchingOptions(
        data.schools.map((school) => ({
          name: school.name!,
          uuid: school.uuid!,
        }))
      );
    }
  }, [data]);

  return (
    <Combobox
      value={selectedOption}
      nullable
      onChange={(option) => {
        setSelectedOption(option);
        if (option === undefined || option === null) {
          setFieldValue({ name: "", uuid: "" });
        } else {
          setFieldValue(option);
        }
      }}
    >
      {({ open }) => (
        <>
          <div
            className={classNames(
              "relative group flex flex-row h-12 rounded-md bg-white border focus-within:border-blue-600 focus-within:ring-blue-600 focus-within:ring-1 focus-within:hover:border-blue-600",
              { "border-red-500 hover:border-red-500": errors !== undefined && touched },
              {
                "border-gray-400 hover:border-gray-600": !(errors !== undefined && touched),
              }
            )}
          >
            <Combobox.Input onChange={() => {}} displayValue={() => field.value} as={React.Fragment}>
              <input
                id="school"
                placeholder="School"
                className={classNames("peer h-full w-full placeholder-transparent border-0 rounded-md focus:ring-0")}
                {...field}
                onChange={(event) => field.onChange(event)}
              />
            </Combobox.Input>
            <Combobox.Label as={React.Fragment}>
              <label
                className={classNames(
                  "absolute bg-white rounded px-0.5 left-3 -top-2.5 text-sm font-light peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:px-0.5 transition-all peer-focus:left-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:font-light peer-focus:px-0.5 hover:cursor-text",
                  { "text-red-500 hover:text-red-500": errors !== undefined && touched },
                  {
                    "text-gray-400 peer-hover:text-gray-600 group-hover:peer-placeholder-shown:text-gray-600 group-hover:peer-focus:text-blue-600":
                      !(errors !== undefined && touched),
                  }
                )}
                htmlFor="school"
              >
                School
              </label>
            </Combobox.Label>
            {field.value.length > 0 && (
              <button
                onClick={() => {
                  setFieldValue({ name: "", uuid: "" });
                  setSelectedOption(undefined);
                }}
              >
                <XIcon className="h-6 w-6 text-gray-400 mr-4" aria-hidden="true" />
              </button>
            )}
            {!isLoading && !open && (
              <Combobox.Button>
                <ChevronDownIcon className="h-6 w-6 text-gray-400 mr-2" aria-hidden="true" />
              </Combobox.Button>
            )}
            {!isLoading && open && (
              <Combobox.Button>
                <ChevronUpIcon className="h-6 w-6 text-gray-400 mr-2" aria-hidden="true" />
              </Combobox.Button>
            )}
            {isLoading && (
              <Combobox.Button disabled>
                <LoadingSpinner color="blue-600" height={6} extra={"mr-2"} />
              </Combobox.Button>
            )}
          </div>
          {!open && errors !== undefined && touched !== undefined && (
            <p className="text-sm text-red-500 ml-3">
              {errors.name !== undefined && <>{errors.name}</>}
              {errors.name === undefined && errors.uuid !== undefined && <>{errors.uuid}</>}
            </p>
          )}
          <Combobox.Options className="mt-2 mb-4 px-1 py-1 max-h-60 w-full overflow-auto ring-gray-500 bg-gray-100 rounded-md shadow">
            {matchingOptions.length === 0 && (
              <Combobox.Option as={React.Fragment} value={{ name: "", uuid: "" }}>
                {({ active }) => (
                  <li className={classNames("px-3 py-1 min-h-8", { "bg-blue-600 text-white rounded-md": active })}>
                    Nothing found
                  </li>
                )}
              </Combobox.Option>
            )}
            {matchingOptions.map((option) => (
              <Combobox.Option key={option.uuid} value={option} as={React.Fragment}>
                {({ active }) => (
                  <li
                    className={classNames("px-3 py-1 min-h-8", {
                      "bg-blue-600 ring-2 ring-blue-600 text-white rounded": active,
                    })}
                  >
                    {option.name}
                  </li>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </>
      )}
    </Combobox>
  );
};

export default CustomCombobox;
