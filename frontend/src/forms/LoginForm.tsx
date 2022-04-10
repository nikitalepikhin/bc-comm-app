import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { CustomTextField } from "./components/CustomTextField";
import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logInUser } from "../features/user/userSlice";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { CustomPasswordField } from "./components/CustomPasswordField";

const initialValues = {
  email: "testteacher@email.com",
  password: "Te_C\"86`'=7Tm+wm",
};

const validationSchema = object({
  email: string().email("invalid email format").required("required field"),
  password: string()
    .required("required field")
    .matches(/^(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[0-9].*)(?=.*[!@#$%^&*()-_=+].*).{8,}$/),
});

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (username) {
      navigate("/");
    }
  }, [navigate, username]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, helpers) => {
          helpers.setSubmitting(true);
          await dispatch(logInUser({ email: values.email, password: values.password }));
          helpers.setSubmitting(false);
        }}
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {(props) => {
          return (
            <Form>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <CustomTextField name={"email"} disableErrorMessage={true} placeholder={"Email"} />
                <CustomPasswordField name={"password"} disableErrorMessage={true} placeholder={"Password"} />
                <Button
                  disabled={props.isSubmitting || props.isValidating || !props.isValid}
                  type={"submit"}
                  disableRipple={true}
                >
                  Log In
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
      {error && <Typography variant={"body1"}>Error: {error}</Typography>}
      <Button>
        <Link to={"/"}>Home</Link>
      </Button>
    </div>
  );
};

export default LoginForm;
