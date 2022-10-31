import classNames from "classnames";
import { Field, FieldProps, Form, Formik } from "formik";
import { useUpdateEmailMutation } from "../../app/enhancedApi";
import { useAppSelector } from "../../app/redux/hooks";
import Alert from "../uilib/Alert";
import Button from "../uilib/Button";
import Input from "../uilib/Input";
import * as yup from "yup";

interface FormValues {
  email: string;
}

const initialValues: FormValues = {
  email: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid format")
    .test("length", "Value is too long.", (value) => (value ? value.length <= 255 : true))
    .required("Required"),
});

export default function EditEmail() {
  const { email, role } = useAppSelector((state) => state.auth.user);
  const [updateEmail, { isLoading, isSuccess, isError, reset }] = useUpdateEmailMutation();

  return (
    <div
      className={classNames(
        "flex flex-col justify-start items-start gap-2",
        "border-b border-slate-200 dark:border-slate-700",
        { "py-2": role !== "STUDENT" }
      )}
    >
      <div className="text-lg font-bold">Change Email</div>
      <div className="flex flex-col justify-start items-start gap-1 w-full">
        <div>Current Email:</div>
        <div className="text-secondary dark:text-slate-400">{isLoading ? "Loading..." : email}</div>
      </div>
      <Formik
        validateOnChange
        validateOnBlur
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={({ email }, { resetForm }) => {
          updateEmail({ updateUserEmailRequestDto: { email } });
          resetForm();
        }}
      >
        {({ handleSubmit, handleReset, dirty, isValid }) => (
          <>
            <Form className="w-full flex flex-col justify-start items-end gap-2">
              <Field name="email">
                {({ field }: FieldProps) => <Input {...field} type="email" labelValue="New Email" fullWidth />}
              </Field>
              <Alert show={isError} fullWidth onClose={() => reset()}>
                Error updating the email. Please try again.
              </Alert>
              <Alert show={isSuccess} fullWidth severity="success" onClose={() => reset()}>
                Email has been successfully updated.
              </Alert>
              <div className="flex flex-row justify-end items-center gap-2 w-full flex-wrap">
                <Button type="button" onClick={() => handleReset()}>
                  Reset Form
                </Button>
                <Button
                  type="button"
                  variant="accent"
                  loading={isLoading}
                  disabled={!dirty || !isValid}
                  onClick={() => handleSubmit()}
                >
                  Update
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}
