import React from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as yup from "yup";
import { Navigate } from "react-router-dom";
import { useLogInMutation } from "../../app/enhancedApi";
import { useAppSelector } from "../../app/hooks";
import Button from "../../common/uilib/Button";
import PageWrapper from "../../common/uilib/PageWrapper";
import classNames from "classnames";
import StyledLink from "../../common/uilib/StyledLink";
import Input from "../../common/uilib/Input";
import Box from "../../common/uilib/Box";

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
    <PageWrapper className={classNames("flex flex-col justify-center items-center mt-[20vh]")}>
      <Box className="flex flex-col justify-center item-center gap-2 w-full max-w-screen-sm">
        <div className="p-2 w-full">
          <h1 className="text-xl font-bold text-center">Log In</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={({ email, password }) => logIn({ logInUserRequestDto: { email, password } })}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnMount={true}
          >
            {({ isValid, dirty }) => (
              <Form className="flex flex-col justify-start items-center gap-2">
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <Input fullWidth type="text" placeholder="Email" labelValue="Email" {...field} />
                  )}
                </Field>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <Input fullWidth type="password" placeholder="Password" labelValue="Password" {...field} />
                  )}
                </Field>
                <div className="flex flex-row justify-center items-center w-full">
                  <Button type="submit" variant="accent" disabled={!isValid || !dirty} className="w-full mt-3">
                    Log In
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="my-3 w-full flex flex-row justify-center items-center flex-wrap">
            <span className="mr-1">Don't have an account?</span>
            <StyledLink to="/signup">Sign up</StyledLink>
          </div>
        </div>
      </Box>
    </PageWrapper>
  );
};

export default LoginPage;
