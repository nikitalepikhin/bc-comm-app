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

interface FormValues {
  email: string;
}

const initialValues: FormValues = {
  email: "",
};

export default function EditEmail() {
  const { email } = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [updateEmail, { isLoading }] = useUpdateEmailMutation();

  return (
    <div
      className={classNames(
        "flex flex-col justify-start items-start gap-2",
        "border-b border-slate-200 dark:border-slate-700",
        "py-2"
      )}
    >
      <div className="text-lg font-bold">Change Email</div>
      <div>
        Current Email:
        <span className="text-secondary dark:text-slate-400 ml-1">{isLoading ? "Loading..." : email}</span>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={({ email }, { resetForm }) => {
          updateEmail({ updateUserEmailRequestDto: { email } });
          resetForm();
        }}
      >
        {({ handleSubmit, dirty, isValid }) => (
          <>
            <Form className="w-full flex flex-col justify-start items-end gap-2">
              <Field name="email">
                {({ field }: FieldProps) => <Input {...field} labelValue="New Email" fullWidth />}
              </Field>
              <Button
                type="button"
                variant="accent"
                loading={isLoading}
                disabled={!dirty || !isValid}
                onClick={() => handleSubmit()}
              >
                Update
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}
