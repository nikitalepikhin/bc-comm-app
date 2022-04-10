import React, { useState } from "react";
import { Field, FieldProps } from "formik";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface CustomPasswordFieldProps {
  name: string;
  type?: "text" | "password";
  placeholder?: string;
  disableErrorMessage?: boolean;
}

export const CustomPasswordField = ({ name, placeholder, disableErrorMessage = false }: CustomPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        return (
          <TextField
            type={showPassword ? "text" : "password"}
            error={meta.touched && meta.error !== undefined && !disableErrorMessage}
            placeholder={placeholder ? placeholder : name.toLowerCase()}
            variant={"outlined"}
            {...field}
            helperText={meta.touched && meta.error !== undefined && !disableErrorMessage ? meta.error : null}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      }}
    </Field>
  );
};
