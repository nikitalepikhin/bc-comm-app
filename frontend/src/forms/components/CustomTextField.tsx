import React from "react";
import { Field, FieldProps } from "formik";
import { TextField } from "@mui/material";

interface CustomTextFieldProps {
  name: string;
  type?: "text" | "password";
  placeholder?: string;
  disableErrorMessage?: boolean;
}

export const CustomTextField = ({
  name,
  type = "text",
  placeholder,
  disableErrorMessage = false,
}: CustomTextFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        return (
          <TextField
            type={type}
            error={meta.touched && meta.error !== undefined && !disableErrorMessage}
            placeholder={placeholder ? placeholder : name.toLowerCase()}
            variant={"outlined"}
            {...field}
            helperText={meta.touched && meta.error !== undefined && !disableErrorMessage ? meta.error : null}
          />
        );
      }}
    </Field>
  );
};
