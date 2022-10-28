import classNames from "classnames";
import { Field, FieldProps, Form, Formik } from "formik";
import Button from "../uilib/Button";
import Input from "../uilib/Input";
import { useUpdatePasswordMutation } from "../../app/enhancedApi";
import * as yup from "yup";
import Alert from "../uilib/Alert";

interface FormValues {
  password: string;
  repeat: string;
}

const initialValues: FormValues = {
  password: "",
  repeat: "",
};

const validationSchema = yup.object({
  password: yup
    .string()
    .required("Required")
    .test("length", "Value is too long", (value) => (value ? value.length <= 50 : true))
    .test("match", "Passwords do not match.", (value, { parent }) => {
      if (parent.repeat === undefined || parent.repeat.length === 0) {
        return true;
      } else {
        return value === parent.repeat;
      }
    }),
  repeat: yup
    .string()
    .required("Required")
    .test("length", "Value is too long", (value) => (value ? value.length <= 50 : true))
    .test("match", "Passwords do not match.", (value, { parent }) => {
      if (parent.password === undefined || parent.password.length === 0) {
        return true;
      } else {
        return value === parent.password;
      }
    }),
});

export default function ChangePassword() {
  const [updatePassword, { isLoading, isSuccess, isError, reset }] = useUpdatePasswordMutation();

  return (
    <div className={classNames("flex flex-col justify-start items-start gap-2", "pt-2")}>
      <div className="text-lg font-bold">Change Password</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ password }, { resetForm }) => {
          updatePassword({ updateUserPasswordRequestDto: { password } });
          resetForm();
        }}
        validateOnChange
        validateOnBlur
      >
        {({ handleSubmit, handleReset, dirty, touched, isValid }) => (
          <Form className="w-full flex flex-col justify-start items-end gap-2">
            <Field name="password">
              {({ field, meta }: FieldProps) => (
                <Input
                  {...field}
                  type="password"
                  labelValue="New Password"
                  fullWidth
                  error={meta.error && meta.touched ? meta.error : undefined}
                />
              )}
            </Field>
            <Field name="repeat">
              {({ field, meta }: FieldProps) => (
                <Input
                  {...field}
                  type="password"
                  labelValue="Repeat New Password"
                  fullWidth
                  error={meta.error && meta.touched ? meta.error : undefined}
                />
              )}
            </Field>
            <Alert show={isError} fullWidth onClose={() => reset()}>
              Error changing the password. Please try again.
            </Alert>
            <Alert show={isSuccess} fullWidth severity="success" onClose={() => reset()}>
              Password has been successfully changed.
            </Alert>
            <div className="flex flex-row justify-end items-center gap-2 flex-wrap">
              <Button type="button" onClick={() => handleReset()}>
                Reset Form
              </Button>
              <Button
                type="button"
                variant="accent"
                loading={isLoading}
                disabled={!isValid || !dirty}
                onClick={() => handleSubmit()}
              >
                Change
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
