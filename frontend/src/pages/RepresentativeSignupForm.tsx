import { FormikErrors, FormikTouched, Field, FieldProps } from "formik";
import ComboBox from "../common/ComboBox";
import { ComboBoxInputType, FormValuesType } from "./SignupPage";
import React from "react";
import TextField from "../common/TextField";
import { SchoolDto, useGetAllMatchingSchoolsQuery } from "../app/api";

interface RepresentativeSignupFormPropsType {
  errors: FormikErrors<FormValuesType>;
  touched: FormikTouched<FormValuesType>;
}

const RepresentativeSignupForm: React.FC<RepresentativeSignupFormPropsType> = ({ errors, touched }) => {
  return (
    <>
      <TextField
        id={"email"}
        name={"email"}
        type={"text"}
        placeholder={"Email"}
        label={"Email"}
        errors={errors.email}
        touched={touched.email}
      />
      <TextField
        id={"password"}
        name={"password"}
        type={"password"}
        placeholder={"Password"}
        label={"Password"}
        errors={errors.password}
        touched={touched.password}
        wrapperClasses={"mt-4"}
      />
      <div className="relative mt-4">
        <Field name="school.value">
          {({ field, form: { setFieldValue } }: FieldProps) => (
            <ComboBox<ComboBoxInputType, SchoolDto>
              dataOptionName={"schools"}
              field={field}
              errors={errors.school}
              touched={touched.school}
              getDefaultValue={() => ({ value: "", uuid: "" })}
              mapDataToMatchingOptions={(school: SchoolDto) => ({ value: school.value, uuid: school.uuid })}
              setFieldValue={(value) => setFieldValue("school", value)}
              useGetDataQuery={useGetAllMatchingSchoolsQuery}
            />
          )}
        </Field>
      </div>
    </>
  );
};

export default RepresentativeSignupForm;
