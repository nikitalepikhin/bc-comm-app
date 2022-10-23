import { useAppSelector } from "../../app/hooks";
import { Field, FieldProps, Form, Formik } from "formik";
import Input from "../../common/uilib/Input";
import Button from "../../common/uilib/Button";
import classNames from "classnames";
import { useUpdateEmailMutation } from "../../app/enhancedApi";
import Dialog from "../../common/uilib/dialog/Dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "./authSlice";
import Alert from "../../common/uilib/Alert";

interface FormValues {
  email: string;
}

const initialValues: FormValues = {
  email: "",
};

export default function EditEmail() {
  const { email } = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [updateEmail, { isLoading, isSuccess, isError, reset }] = useUpdateEmailMutation();

  return (
    <div
      className={classNames(
        "flex flex-col justify-start items-start gap-2",
        "border-b border-slate-200 dark:border-slate-700",
        "py-2"
      )}
    >
      <div className="text-lg font-bold">Change Email</div>
      <div className="flex flex-col justify-start items-start gap-1 w-full">
        <div>Current Email:</div>
        <div className="text-secondary dark:text-slate-400">{isLoading ? "Loading..." : email}</div>
      </div>
      <Formik
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
