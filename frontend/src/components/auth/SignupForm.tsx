import { Field, FieldProps, Form, Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  useGetFacultyAutocompleteMutation,
  useGetSchoolAutocompleteMutation,
  useSignUpBaseMutation,
  useSignUpRepresentativeMutation,
  useSignUpTeacherMutation,
} from "../../app/enhancedApi";
import Alert from "../uilib/Alert";
import Button from "../uilib/Button";
import Combobox from "../uilib/Combobox";
import Input from "../uilib/Input";
import RadioGroup from "../uilib/RadioGroup";

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
    .test("length", "Value is too long.", (value) => (value ? value.length <= 255 : true))
    .required("Required"),
  password: yup
    .string()
    .test("length", "Value is too long", (value) => (value ? value.length <= 50 : true))
    .required("Required"),
  name: yup
    .string()
    .test("length", "Value is too long", (value) => (value ? value.length <= 128 : true))
    .when("type", {
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
    signUpStudent,
    { isLoading: signUpBaseLoading, isSuccess: signUpBaseSuccess, isError: signUpBaseError, reset: signUpBaseReset },
  ] = useSignUpBaseMutation();
  const [
    signUpTeacher,
    {
      isLoading: signUpTeacherLoading,
      isSuccess: signUpTeacherSuccess,
      isError: signUpTeacherError,
      reset: signUpTeacherReset,
    },
  ] = useSignUpTeacherMutation();
  const [
    signUpRepr,
    { isLoading: signUpReprLoading, isSuccess: signUpReprSuccess, isError: signUpReprError, reset: signUpReprReset },
  ] = useSignUpRepresentativeMutation();
  const signUpLoading = signUpBaseLoading || signUpTeacherLoading || signUpReprLoading;
  const signUpError = signUpBaseError || signUpTeacherError || signUpReprError;
  const signUpSuccess = signUpBaseSuccess || signUpTeacherSuccess || signUpReprSuccess;

  useEffect(() => {
    if (signUpBaseSuccess || signUpReprSuccess || signUpTeacherSuccess) {
      navigate("/");
    }
  }, [signUpBaseSuccess, signUpReprSuccess, signUpTeacherSuccess]);

  return (
    <div className="w-full flex flex-col justify-start items-stretch gap-2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={false}
        validateOnChange
        validateOnBlur
        onSubmit={(values) => {
          switch (values.type) {
            case "student": {
              signUpStudent({
                createBaseUserRequestDto: { email: values.email, password: values.password },
              });
              break;
            }
            case "teacher": {
              signUpTeacher({
                createTeacherUserRequestDto: {
                  email: values.email,
                  password: values.password,
                  name: values.name,
                  schoolUuid: values.school!.value,
                  facultyUuid: values.faculty!.value,
                },
              });
              break;
            }
            case "representative": {
              signUpRepr({
                createRepresentativeUserRequestDto: {
                  email: values.email,
                  password: values.password,
                  name: values.name,
                  schoolUuid: values.school!.value,
                },
              });
              break;
            }
          }
        }}
      >
        {({ values, setFieldValue, handleSubmit, isValid, dirty, resetForm }) => (
          <Form className="flex flex-col justify-start items-center gap-2">
            <Alert show={signUpError} fullWidth>
              Error signing up. Please try again.
            </Alert>
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
                    disabled={signUpSuccess}
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
                  disabled={signUpSuccess}
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
                  disabled={signUpSuccess}
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
                    disabled={signUpSuccess}
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
                    disabled={values.school === null || signUpSuccess}
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
              loading={signUpLoading}
              disabled={!isValid || !dirty || signUpSuccess}
              type="button"
              variant="accent"
            >
              Create Account
            </Button>
            <Alert
              show={signUpSuccess}
              fullWidth
              severity="success"
              onClose={() => {
                signUpBaseReset();
                signUpTeacherReset();
                signUpReprReset();
                resetForm();
              }}
            >
              You have successfully signed up. You can now log in.
            </Alert>
          </Form>
        )}
      </Formik>
    </div>
  );
}
