import classNames from "classnames";
import { Field, FieldProps, Form, Formik } from "formik";
import Button from "../../common/uilib/Button";
import Input from "../../common/uilib/Input";

interface FormValues {
  password: string;
  repeat: string;
}

const initialValues: FormValues = {
  password: "",
  repeat: "",
};

export default function ChangePassword() {
  return (
    <div
      className={classNames(
        "flex flex-col justify-start items-start gap-2",
        "border-b border-slate-200 dark:border-slate-700",
        "py-2"
      )}
    >
      <div className="text-lg font-bold">Change Password</div>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          // todo
        }}
      >
        {({ handleSubmit }) => (
          <Form className="w-full flex flex-col justify-start items-end gap-2">
            <Field name="password">
              {({ field }: FieldProps) => <Input {...field} labelValue="New Password" fullWidth />}
            </Field>
            <Field name="repeat">
              {({ field }: FieldProps) => <Input {...field} labelValue="Repeat New Password" fullWidth />}
            </Field>
            <Button type="button" variant="accent" onClick={() => handleSubmit()}>
              Change
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
