import { Field, FieldProps, Form, Formik } from "formik";
import Input from "../../common/uilib/Input";
import Textarea from "../../common/uilib/Textarea";
import Container from "../../common/uilib/Container";
import Button from "../../common/uilib/Button";
import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "../../app/enhancedApi";
import DisplayField from "../../common/uilib/DisplayField";
import { useAppSelector } from "../../app/hooks";
import LoadingSpinner from "../../common/uilib/LoadingSpinner";
import Alert from "../../common/uilib/Alert";

interface FormValues {
  name: string | undefined;
  bio: string | undefined;
}

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
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => {
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
