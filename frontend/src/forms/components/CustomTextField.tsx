import React from "react";
import { Field, FieldProps } from "formik";
import { TextField } from "@mui/material";

interface CustomTextFieldProps {
  name: string;
  type?: "text" | "password";
}

function CustomTextField({ name, type }: CustomTextFieldProps) {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        return (
          <TextField
            type={type}
            error={meta.touched && meta.error !== undefined}
            placeholder={name.toUpperCase()}
            variant={"outlined"}
            {...field}
            helperText={meta.error}
          />
        );
      }}
    </Field>
  );
}

export default CustomTextField;
