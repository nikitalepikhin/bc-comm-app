import { Field, FieldProps, Form, Formik } from "formik";
import Input from "../uilib/Input";
import Textarea from "../uilib/Textarea";
import Container from "../uilib/Container";
import Button from "../uilib/Button";
import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "../../app/enhancedApi";
import DisplayField from "../uilib/DisplayField";
import { useAppSelector } from "../../app/redux/hooks";
import LoadingSpinner from "../uilib/LoadingSpinner";
import Alert from "../uilib/Alert";
import * as yup from "yup";

interface FormValues {
  name: string | undefined;
  bio: string | undefined;
}

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Required")
    .test("length", "Value is too long", (value) => (value ? value.length <= 128 : true)),
  bio: yup.string().test("length", "Value is too long", (value) => (value ? value.length <= 1024 : true)),
});

export default function EditProfile() {
  const { role } = useAppSelector((state) => state.auth.user);
  const [editing, setEditing] = useState(false);

  const {
    data,
    isLoading: profileLoading,
    isError: profileError,
    isSuccess: profileSuccess,
    refetch,
  } = useGetUserProfileQuery();
  const [updateProfile, { isError: updateError, reset }] = useUpdateUserProfileMutation();

  const initialValues: FormValues = {
    name: data?.name,
    bio: data?.bio,
  };

  return (
    <Container title="Edit Profile" className="w-full">
      {profileLoading && (
        <div className="pt-2">
          <LoadingSpinner />
        </div>
      )}
      <Alert show={profileError} fullWidth onClose={() => refetch()}>
        Error loading current profile data. Close this alert to refetch.
      </Alert>
      {profileSuccess && (
        <Formik
          validateOnChange
          validateOnBlur
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log();
            updateProfile({
              updateUserProfileRequestDto: {
                name: values.name,
                bio: values.bio,
              },
            });
            setEditing(false);
          }}
        >
          {({ handleSubmit }) => (
            <Form className="flex flex-col justify-start items-end gap-2 w-full">
              {!editing && (
                <Button
                  onClick={() => setEditing(true)}
                  type="button"
                  icon={<PencilSquareIcon className="h-5 w-5" />}
                  className="w-full"
                >
                  Edit
                </Button>
              )}
              <DisplayField data={role} labelValue="Role" />
              {editing ? (
                <Field name="name">
                  {({ field, meta }: FieldProps) => <Input {...field} labelValue="Name" fullWidth />}
                </Field>
              ) : (
                <DisplayField data={data?.name} labelValue="Name" />
              )}
              {editing && role === "TEACHER" ? (
                <Field name="bio">
                  {({ field, meta }: FieldProps) => <Textarea {...field} labelValue="Bio" fullWidth size="sm" resize />}
                </Field>
              ) : (
                <DisplayField data={data?.bio} labelValue="Bio" />
              )}
              <Alert show={updateError} fullWidth onClose={() => reset()}>
                Error updating the profile. Please try again.
              </Alert>
              {editing && (
                <div className="flex flex-row justify-end items-center gap-2">
                  <Button type="button" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="button" variant="accent" onClick={() => handleSubmit()}>
                    Update
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
}
