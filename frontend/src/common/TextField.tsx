import React from "react";
import { Field } from "formik";
import classNames from "classnames";

export interface TextFieldPropsType {
  id: string;
  name: string;
  type: "text" | "password";
  placeholder: string;
  label: string;
  errors?: string;
  touched?: boolean;
  wrapperClasses?: string;
  fieldClasses?: string;
  labelClasses?: string;
  errorClasses?: string;
}

const TextField: React.FC<TextFieldPropsType> = ({
  id,
  name,
  type,
  placeholder,
  label,
  errors,
  touched,
  wrapperClasses,
  fieldClasses,
  labelClasses,
  errorClasses,
  children,
}) => {
  return (
    <div className={classNames("relative", { [wrapperClasses ?? ""]: wrapperClasses !== undefined })}>
      <Field
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={classNames(
          "peer h-12 w-full rounded-md bg-white px-3 focus:border-blue-600 focus:ring-blue-600 placeholder-transparent",
          { "border-red-500 hover:border-red-500": errors !== undefined && touched },
          {
            "border-gray-400 hover:border-gray-600": !(errors !== undefined && touched),
          },
          { [fieldClasses ?? ""]: fieldClasses !== undefined }
        )}
      />
      <label
        htmlFor={id}
        className={classNames(
          "absolute bg-white rounded px-0.5 left-3 -top-2.5 text-sm font-light peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:px-0.5 transition-all peer-focus:left-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:font-light peer-focus:px-0.5 hover:cursor-text",
          { "text-red-500 hover:text-red-500": errors !== undefined && touched },
          {
            "text-gray-400 peer-hover:text-gray-600": !(errors !== undefined && touched),
          },
          { [labelClasses ?? ""]: labelClasses !== undefined }
        )}
      >
        {label}
      </label>
      {errors !== undefined && touched && (
        <p className={classNames("text-sm text-red-500 ml-3", { [errorClasses ?? ""]: errorClasses !== undefined })}>
          {errors}
        </p>
      )}
      {children}
    </div>
  );
};

export default TextField;
