import { Field, FieldProps } from "formik";
import { MenuItem, Select } from "@mui/material";

interface CustomSelectFieldProps {
  name: string;
  items: Array<{ value: string | number; text: string }>;
  value: string;
}

export const CustomSelectField = ({ name, items, value }: CustomSelectFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        return (
          <Select error={meta.touched && meta.error !== undefined} {...field} value={value} label={"Account Type"}>
            {items.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        );
      }}
    </Field>
  );
};
