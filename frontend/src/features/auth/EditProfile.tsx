import { Field, FieldProps, Form, Formik } from "formik";
import Input from "../../common/uilib/Input";
import Textarea from "../../common/uilib/Textarea";
import Container from "../../common/uilib/Container";
import Button from "../../common/uilib/Button";

interface FormValues {
  name: string;
  bio: string;
}

const initialValues: FormValues = {
  name: "",
  bio: "",
};

export default function EditProfile() {
  return (
    <Container title="Edit Profile" className="w-full">
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          // todo
        }}
      >
        {({ handleSubmit }) => (
          <Form className="flex flex-col justify-start items-end gap-2 w-full">
            <Field name="name">
              {({ field, meta }: FieldProps) => <Input {...field} labelValue="Name" fullWidth />}
            </Field>
            <Field name="bio">
              {({ field, meta }: FieldProps) => <Textarea {...field} labelValue="Bio" fullWidth size="sm" resize />}
            </Field>
            <Button type="button" variant="accent" onClick={() => handleSubmit()}>
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
