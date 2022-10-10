import React, { useEffect } from "react";
import * as yup from "yup";
import { Field, FieldProps, Form, Formik } from "formik";
import ComboBox from "../../common/uilib/ComboBox";
import {
  useGetFacultyAutocompleteMutation,
  useGetSchoolAutocompleteMutation,
  useSignUpBaseMutation,
  useSignUpTeacherMutation,
  useSignUpRepresentativeMutation,
} from "../../app/enhancedApi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../common/uilib/Button";
import PageWrapper from "../../common/uilib/PageWrapper";

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

const SignupPage: React.FC = () => {
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
      navigate("/login");
    }
  }, [signUpBaseUserIsSuccess, signUpRepresentativeUserIsSuccess, signUpTeacherUserIsSuccess]);

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col justify-center items-center py-8 px-6 sm:px-8">
        <div className="flex flex-col justify-start items-center min-h-[60vh] w-full">
          <div>
            <h2 className="text-2xl font-bold text-center">Create an account</h2>
          </div>
          <div className="mt-6 w-full md:max-w-lg">
            <div className="bg-white py-8 px-6 shadow rounded-lg">
              {signUpIsError && <div>Error: could not create a new account.</div>}
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
                  <Form className="flex flex-col justify-between items-center gap-2 w-full">
                    <Field name="type">
                      {({ field }: FieldProps) => (
                        <div className="flex flex-col">
                          <div>
                            <label htmlFor="student">Student</label>
                            <input
                              id="student"
                              type="radio"
                              {...field}
                              value="student"
                              checked={values.type === "student"}
                            />
                          </div>
                          <div>
                            <label htmlFor="teacher">Teacher</label>
                            <input
                              id="teacher"
                              type="radio"
                              {...field}
                              value="teacher"
                              checked={values.type === "teacher"}
                            />
                          </div>
                          <div>
                            <label htmlFor="representative">Representative</label>
                            <input
                              id="representative"
                              type="radio"
                              {...field}
                              value="representative"
                              checked={values.type === "representative"}
                            />
                          </div>
                        </div>
                      )}
                    </Field>
                    {values.type !== "student" && (
                      <Field name="name">
                        {({ field }: FieldProps) => (
                          <div>
                            <label htmlFor={field.name}>Name</label>
                            <input type="text" {...field} />
                          </div>
                        )}
                      </Field>
                    )}
                    <Field name="email">
                      {({ field }: FieldProps) => (
                        <div>
                          <label htmlFor={field.name}>Email</label>
                          <input type="text" {...field} />
                        </div>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field }: FieldProps) => (
                        <div>
                          <label htmlFor={field.name}>Password</label>
                          <input type="password" {...field} />
                        </div>
                      )}
                    </Field>
                    {values.type !== "student" && (
                      <Field name="school">
                        {({ field }: FieldProps) => (
                          <div>
                            <label htmlFor={field.name}>School</label>
                            <ComboBox
                              name={field.name}
                              initialState={values.school ? values.school : undefined}
                              loading={schoolAutocompleteIsLoading}
                              onChange={(value) => setFieldValue(field.name, value)}
                              onInputChange={(value) =>
                                getSchoolAutocomplete({ getSchoolAutocompleteRequestDto: { value } })
                              }
                              wait={1000}
                              options={schoolSuggestions ? schoolSuggestions.schools : []}
                            />
                          </div>
                        )}
                      </Field>
                    )}
                    {values.type === "teacher" && (
                      <Field name="faculty">
                        {({ field }: FieldProps) => (
                          <div>
                            <label htmlFor={field.name}>Faculty</label>
                            <ComboBox
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
                            />
                          </div>
                        )}
                      </Field>
                    )}
                    <Button
                      className="w-full"
                      onClick={() => handleSubmit()}
                      loading={signUpIsLoading}
                      disabled={!isValid || !dirty}
                    >
                      Create Account
                    </Button>
                    {Object.keys(errors).length > 0 && <pre>{JSON.stringify(errors, null, 2)}</pre>}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="mt-6">
            <p>
              Already registered?
              <Link to="/login" className="text-accent hover:underline hover:text-accent-strong pl-1.5">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignupPage;
