import React from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as yup from "yup";
import { Navigate } from "react-router-dom";
import TextField from "../../common/ui/TextField";
import { useLogInMutation, useRefreshTokenMutation } from "../../app/enhancedApi";
import { useAppSelector } from "../../app/hooks";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid format")
    .required("Required"),
  password: yup.string().required("Required"),
});

const LoginPage: React.FC = () => {
  const [logIn] = useLogInMutation(); // todo show spinner while logging in + handle error
  const { present } = useAppSelector((state) => state.auth);

  return present ? (
    <Navigate to="/" replace />
  ) : (
    <div className="min-h-screen flex flex-col justify-center items-center py-8 px-6 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold text-center">Welcome back!</h2>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={({ email, password }) => logIn({ logInUserRequestDto: { email, password } })}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnMount={true}
      >
        {({ isValid, dirty }) => (
          <div className="mt-6 w-full md:max-w-md ">
            <div className="bg-white py-8 px-6 shadow rounded-lg">
              <Form>
                <Field name={"email"}>
                  {({ field }: FieldProps) => (
                    <TextField id={"email"} type={"text"} placeholder={"Email"} label={"Email"} field={field} />
                  )}
                </Field>
                <Field name={"password"}>
                  {({ field }: FieldProps) => (
                    <TextField
                      id={"password"}
                      type={"password"}
                      placeholder={"Password"}
                      label={"Password"}
                      wrapperClasses={"mt-4"}
                      field={field}
                    >
                      {/*<p className="flex justify-end">*/}
                      {/*  <a href="#" className="text-blue-600 hover:underline hover:text-blue-900 text-sm mr-2 mt-0.5">*/}
                      {/*    Forgot your password?*/}
                      {/*  </a>*/}
                      {/*</p>*/}
                    </TextField>
                  )}
                </Field>
                <div className="flex justify-center mt-3">
                  <button
                    type="submit"
                    className="h-10 w-full py-2 px-4 border border-transparent rounded text-base font-medium bg-blue-600 text-white hover:bg-blue-900 transition-all shadow disabled:text-gray-700 disabled:bg-gray-300"
                    disabled={!isValid || !dirty}
                  >
                    Log In
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
      <div className="mt-6">
        <p>
          Don't have an account?
          <a href="/signup" className="text-blue-600 hover:underline hover:text-blue-900 pl-2">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
