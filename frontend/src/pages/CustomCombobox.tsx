import { Combobox } from "@headlessui/react";
import classNames from "classnames";
import { FieldInputProps, FormikErrors, FormikTouched } from "formik";
import React, { useEffect, useState } from "react";
import { useGetAllMatchingSchoolsMutation } from "../app/api";
import { SchoolInputType } from "./SignupPage";
import { SelectorIcon } from "@heroicons/react/solid";

interface CustomComboboxPropsType {
  setFieldValue: (value: SchoolInputType) => void;
  errors: FormikErrors<SchoolInputType> | undefined;
  touched: FormikTouched<SchoolInputType> | undefined;
  field: FieldInputProps<any>;
}

const CustomCombobox: React.FC<CustomComboboxPropsType> = ({ setFieldValue, errors, touched, field }) => {
  const [selectedOption, setSelectedOption] = useState<SchoolInputType | undefined>(undefined);
  const [matchingOptions, setMatchingOptions] = useState<SchoolInputType[]>([]);
  const [getAllMatchingSchools, { data, isLoading }] = useGetAllMatchingSchoolsMutation();

  useEffect(() => {
    if (data && data.schools) {
      console.log(
        "got new matches",
        data.schools.map((school) => ({
          name: school.name!,
          uuid: school.uuid!,
        }))
      );
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
        console.log("setting the selected option to", option);
        setSelectedOption(option);
        if (option === undefined) {
          setFieldValue({ name: "", uuid: "" });
        } else {
          setFieldValue(option);
        }
      }}
    >
      <div
        className={classNames(
          "relative group flex flex-row h-12 rounded-md bg-white border border-gray-400 focus-within:border-blue-600 focus-within:ring-blue-600 focus-within:ring-1 focus-within:hover:border-blue-600",
          { "border-red-500 hover:border-red-500": errors !== undefined && touched },
          {
            "border-gray-400 hover:border-gray-600": !(errors !== undefined && touched),
          }
        )}
      >
        <Combobox.Input
          id="school"
          placeholder="School"
          className={classNames("peer h-full w-full placeholder-transparent border-0 rounded-md focus:ring-0")}
          onChange={(event) => {
            if (event.target.value === "") {
              setMatchingOptions([]);
            } else {
              getAllMatchingSchools({
                getMatchingSchoolsRequestDto: {
                  substring: event.target.value,
                },
              });
            }
            console.log("Changing the combobox value to:", event.target.value);
          }}
          displayValue={() => field.value}
        />
        <Combobox.Label
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
        </Combobox.Label>
        <Combobox.Button>
          <SelectorIcon className="h-6 w-6 text-gray-400 mr-2" aria-hidden="true" />
        </Combobox.Button>
      </div>
      <Combobox.Options>
        {matchingOptions.length === 0 && <div>Nothing found</div>}
        {matchingOptions.map((option) => (
          <Combobox.Option key={option.uuid} value={option}>
            {option.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

export default CustomCombobox;
