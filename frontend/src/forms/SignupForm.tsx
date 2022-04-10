import React, { useState } from "react";
import { Form, Formik } from "formik";
import { CustomTextField } from "./components/CustomTextField";
import { Box, Button, Typography } from "@mui/material";
import { CustomSelectField } from "./components/CustomSelectField";
import { AuthenticationService } from "../services/AuthenticationService";
import { ApiObjRegisterUserRequestDtoRoleEnum } from "../generatedApi";
import { object, ref, string } from "yup";
import { Link } from "react-router-dom";
import { CustomPasswordField } from "./components/CustomPasswordField";

interface SignupFormValuesType {
  email: string;
  password: string;
  repeatPassword: string;
  role: "student" | "teacher";
}

const initialValues: SignupFormValuesType = {
  email: "",
  password: "",
  repeatPassword: "",
  role: "student",
};

const mapEnum = (role: string) => {
  switch (role) {
    case "teacher":
      return ApiObjRegisterUserRequestDtoRoleEnum.Teacher;
    case "student":
      return ApiObjRegisterUserRequestDtoRoleEnum.Student;
    case "admin":
      return ApiObjRegisterUserRequestDtoRoleEnum.Admin;
    default:
      return ApiObjRegisterUserRequestDtoRoleEnum.Student;
  }
};

const validationSchema = object({
  email: string().email("invalid email format").required("required field"),
  password: string()
    .required("required field")
    .matches(/^(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[0-9].*)(?=.*[!@#$%^&*()-_=+].*).{8,}$/, "weak password"),
  repeatPassword: string()
    .required("required field")
    .matches(/^(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[0-9].*)(?=.*[!@#$%^&*()-_=+].*).{8,}$/, "weak password")
    .oneOf([ref("password"), null], "passwords do not match"),
  role: string().required("required field"),
});

export const SignupForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [info, setInfo] = useState<string | undefined>(undefined);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, helpers) => {
          try {
            helpers.setSubmitting(true);
            await AuthenticationService.signUpUser({
              email: values.email,
              password: values.password,
              role: mapEnum(values.role),
            });
            setInfo("You have successfully signed up!");
          } catch (e) {
            setError(e.message);
          } finally {
            helpers.setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {(props) => {
          return (
            <Form>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <CustomSelectField
                  name={"role"}
                  items={[
                    { value: "student", text: "Student" },
                    { value: "teacher", text: "Teacher" },
                  ]}
                  value={props.values.role}
                />
                <CustomTextField name={"email"} placeholder={"Email"} />
                <CustomPasswordField name={"password"} placeholder={"Password"} />
                <CustomPasswordField name={"repeatPassword"} placeholder={"Repeat Password"} />
                <Button
                  disabled={props.isSubmitting || props.isValidating || !props.isValid}
                  type={"submit"}
                  disableRipple={true}
                >
                  Create Account
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
      {error && <Typography variant={"body1"}>Error: {error}</Typography>}
      {info && (
        <>
          <Typography variant={"body1"}>{info}</Typography>
          <Button href="/login">Log In</Button>
        </>
      )}
      <Button>
        <Link to={"/"}>Home</Link>
      </Button>
    </div>
  );
};
