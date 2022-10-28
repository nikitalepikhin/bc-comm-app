import { Field, FieldProps, Form, Formik } from "formik";
import * as yup from "yup";
import { useLogInMutation } from "../../app/enhancedApi";
import Alert from "../uilib/Alert";
import Button from "../uilib/Button";
import Input from "../uilib/Input";

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

export default function LoginForm() {
  const [logIn, { isError, isLoading, reset }] = useLogInMutation();

  return (
    <div className="w-full flex flex-col justify-start items-stretch gap-2">
      <Formik
        initialValues={initialValues}
        onSubmit={({ email, password }) => logIn({ logInUserRequestDto: { email, password } })}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnMount={true}
      >
        {({ isValid, dirty }) => (
          <Form className="flex flex-col justify-start items-center gap-2">
            <Alert show={isError} fullWidth onClose={() => reset()}>
              Unfortunately we could not log you in. Please try again.
            </Alert>
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
              <Button
                type="submit"
                variant="accent"
                disabled={!isValid || !dirty}
                loading={isLoading}
                className="w-full mt-3"
              >
                Log In
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
