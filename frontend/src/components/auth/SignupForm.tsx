import React, { useEffect } from "react";
import * as yup from "yup";
import { Field, FieldProps, Form, Formik } from "formik";
import Combobox from "../uilib/Combobox";
import {
  useGetFacultyAutocompleteMutation,
  useGetSchoolAutocompleteMutation,
  useSignUpBaseMutation,
  useSignUpTeacherMutation,
  useSignUpRepresentativeMutation,
} from "../../app/enhancedApi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../uilib/Button";
import PageWrapper from "../uilib/PageWrapper";
import RadioGroup from "../uilib/RadioGroup";
import Input from "../uilib/Input";

export interface ComboBoxInputType {
  value: string;
  uuid: string;
}

export interface FormValuesType {
  type: "student" | "teacher" | "representative";
  email: string;
  password: string;
  name: string;
  school: { value: string; text: string } | null;
  faculty: { value: string; text: string } | null;
}

const initialValues: FormValuesType = {
  type: "student",
  name: "",
  email: "",
  password: "",
  school: null,
  faculty: null,
};

const validationSchema = yup.object({
  type: yup.string().required(),
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid format")
    .required("Required"),
  password: yup.string().required("Required"),
  name: yup.string().when("type", {
    is: (type: FormValuesType["type"]) => type === "teacher" || type === "representative",
    then: (schema) => schema.required("Required"),
  }),
  school: yup
    .object()
    .nullable()
    .when("type", {
      is: (type: string) => type === "teacher" || type === "representative",
      then: (schema) => schema.required("Required"),
    }),
  faculty: yup
    .object()
    .nullable()
    .when("type", {
      is: (type: string) => type === "teacher",
      then: (schema) => schema.required("Required"),
    }),
});

export default function SignupForm() {
  const navigate = useNavigate();
  const [getSchoolAutocomplete, { data: schoolSuggestions, isLoading: schoolAutocompleteIsLoading }] =
    useGetSchoolAutocompleteMutation();
  const [getFacultyAutocomplete, { data: facultySuggestions, isLoading: facultyAutocompleteIsLoading }] =
    useGetFacultyAutocompleteMutation();
  const [
    signUpBaseUser,
    { isLoading: signUpBaseUserIsLoading, isSuccess: signUpBaseUserIsSuccess, isError: signUpBaseUserIsError },
  ] = useSignUpBaseMutation();
  const [
    signUpTeacherUser,
    { isLoading: signUpTeacherUserIsLoading, isSuccess: signUpTeacherUserIsSuccess, isError: signUpTeacherUserIsError },
  ] = useSignUpTeacherMutation();
  const [
    signUpRepresentativeUser,
    {
      isLoading: signUpRepresentativeUserIsLoading,
      isSuccess: signUpRepresentativeUserIsSuccess,
      isError: signUpRepresentativeUserIsError,
    },
  ] = useSignUpRepresentativeMutation();
  const signUpIsLoading = signUpBaseUserIsLoading || signUpTeacherUserIsLoading || signUpRepresentativeUserIsLoading;
  const signUpIsError = signUpBaseUserIsError || signUpTeacherUserIsError || signUpRepresentativeUserIsError;

  useEffect(() => {
    if (signUpBaseUserIsSuccess || signUpRepresentativeUserIsSuccess || signUpTeacherUserIsSuccess) {
      navigate("/");
    }
  }, [signUpBaseUserIsSuccess, signUpRepresentativeUserIsSuccess, signUpTeacherUserIsSuccess]);

  return (
    <div className="w-full flex flex-col justify-start items-stretch gap-2">
      {/*<h1 className="text-xl font-bold text-center">Sign Up</h1>*/}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={false}
        validateOnChange
        validateOnBlur
        onSubmit={(values) => {
          switch (values.type) {
            case "student": {
              signUpBaseUser({
                createBaseUserDto: { email: values.email, password: values.password, role: "STUDENT" },
              });
              break;
            }
            case "teacher": {
              signUpTeacherUser({
                createTeacherUserDto: {
                  email: values.email,
                  password: values.password,
                  name: values.name,
                  schoolUuid: values.school!.value,
                  facultyUuid: values.faculty!.value,
                  role: "TEACHER",
                },
              });
              break;
            }
            case "representative": {
              signUpRepresentativeUser({
                createRepresentativeUserDto: {
                  email: values.email,
                  password: values.password,
                  name: values.name,
                  schoolUuid: values.school!.value,
                  role: "REPRESENTATIVE",
                },
              });
              break;
            }
          }
        }}
      >
        {({ values, errors, setFieldValue, handleSubmit, isValid, dirty }) => (
          <Form className="flex flex-col justify-start items-center gap-2">
            <Field name="type">
              {({ field }: FieldProps) => (
                <RadioGroup
                  {...field}
                  labelValue="Account Type"
                  defaultValue="student"
                  options={[
                    { value: "student", label: "Student" },
                    { value: "teacher", label: "Teacher" },
                    { value: "representative", label: "Representative" },
                  ]}
                />
              )}
            </Field>
            {values.type !== "student" && (
              <Field name="name">
                {({ field, meta }: FieldProps) => (
                  <Input
                    fullWidth
                    type="text"
                    placeholder="Name"
                    labelValue="Name"
                    {...field}
                    error={meta.error && meta.touched ? meta.error : undefined}
                  />
                )}
              </Field>
            )}
            <Field name="email">
              {({ field, meta }: FieldProps) => (
                <Input
                  fullWidth
                  type="text"
                  placeholder="Email"
                  labelValue="Email"
                  {...field}
                  error={meta.error && meta.touched ? meta.error : undefined}
                />
              )}
            </Field>
            <Field name="password">
              {({ field, meta }: FieldProps) => (
                <Input
                  fullWidth
                  type="password"
                  placeholder="Password"
                  labelValue="Password"
                  {...field}
                  error={meta.error && meta.touched ? meta.error : undefined}
                />
              )}
            </Field>
            {values.type !== "student" && (
              <Field name="school">
                {({ field, meta }: FieldProps) => (
                  <Combobox
                    labelValue="School"
                    name={field.name}
                    initialState={values.school ? values.school : undefined}
                    loading={schoolAutocompleteIsLoading}
                    onChange={(value) => setFieldValue(field.name, value)}
                    onInputChange={(value) => getSchoolAutocomplete({ getSchoolAutocompleteRequestDto: { value } })}
                    wait={1000}
                    options={schoolSuggestions ? schoolSuggestions.schools : []}
                    error={meta.error && meta.touched ? meta.error : undefined}
                  />
                )}
              </Field>
            )}
            {values.type === "teacher" && (
              <Field name="faculty">
                {({ field, meta }: FieldProps) => (
                  <Combobox
                    labelValue="Faculty"
                    name={field.name}
                    initialState={values.faculty ? values.faculty : undefined}
                    loading={facultyAutocompleteIsLoading}
                    disabled={values.school === null}
                    onChange={(value) => setFieldValue(field.name, value)}
                    onInputChange={(value) =>
                      getFacultyAutocomplete({
                        getFacultyAutocompleteRequestDto: { value, schoolUuid: values.school!.value },
                      })
                    }
                    wait={1000}
                    options={facultySuggestions ? facultySuggestions.faculties : []}
                    dependencies={[values.school]}
                    error={meta.error && meta.touched ? meta.error : undefined}
                  />
                )}
              </Field>
            )}
            <Button
              className="w-full"
              onClick={() => handleSubmit()}
              loading={signUpIsLoading}
              disabled={!isValid || !dirty}
              type="button"
              variant="accent"
            >
              Create Account
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
