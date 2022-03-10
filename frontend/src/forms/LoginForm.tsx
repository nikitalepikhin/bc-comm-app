import React from "react";
import { Form, Formik } from "formik";
import CustomTextField from "./components/CustomTextField";
import { Button } from "@mui/material";

const initialValues = {
  email: "",
  password: "",
};

function LoginForm() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => {
        helpers.setSubmitting(true);
        console.log("Submitting values", values);
        helpers.setSubmitting(false);
      }}
    >
      {(props) => {
        return (
          <Form>
            <CustomTextField name={"email"} />
            <CustomTextField name={"password"} type={"password"} />
            <Button
              disabled={props.isSubmitting}
              type={"submit"}
              disableRipple={true}
            >
              Log In
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
