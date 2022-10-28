import { XMarkIcon } from "@heroicons/react/20/solid";
import { Field, FieldProps, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreatePostMutation, useGetChannelByTextIdQuery } from "../../app/enhancedApi";
import Alert from "../uilib/Alert";
import Button from "../uilib/Button";
import Container from "../uilib/Container";
import Dialog from "../uilib/dialog/Dialog";
import Input from "../uilib/Input";
import LoadingSpinner from "../uilib/LoadingSpinner";
import Textarea from "../uilib/Textarea";
import * as yup from "yup";

interface AddPostFormValues {
  title: string;
  body: string;
}

const initialValues: AddPostFormValues = {
  title: "",
  body: "",
};

const validationSchema = yup.object({
  title: yup
    .string()
    .required("Required")
    .test("length", "Title is too long", (value) => (value ? value.length <= 300 : true)),
  body: yup
    .string()
    .required("Required")
    .test("length", "Body is too long", (value) => (value ? value.length <= 10000 : true)),
});

export default function AddPostPage() {
  const { textId } = useParams() as { textId: string };
  const navigate = useNavigate();
  const [createPost, { data: createPostData, isSuccess, isLoading, isError, reset }] = useCreatePostMutation();
  const {
    data,
    isFetching: getChannelByTextIdIsFetching,
    isError: getChannelError,
    refetch: getChannel,
  } = useGetChannelByTextIdQuery({ textId });
  const [isExiting, setIsExiting] = useState(false);

  if (getChannelByTextIdIsFetching) {
    return <LoadingSpinner />;
  }

  useEffect(() => {
    if (isSuccess) {
      navigate(`/channels/${textId}/post/${createPostData!.uuid}`);
    }
  }, [isSuccess]);

  return (
    <Formik
      validateOnChange
      validateOnBlur
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async ({ title, body }) => {
        if (data) {
          await createPost({ createPostRequestDto: { channelUuid: data.uuid, title, body } });
        }
      }}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <>
          <div className="flex flex-col justify-start items-stretch w-full gap-2">
            <div className="flex flex-row justify-end items-center w-full">
              <Button
                className="w-full"
                onClick={() => {
                  if (dirty) {
                    setIsExiting(true);
                  } else {
                    navigate(`/channels/${textId}`);
                  }
                }}
                icon={<XMarkIcon className="h-5 w-5" />}
              >
                Close
              </Button>
            </div>
            <Alert show={getChannelError} fullWidth onClose={() => getChannel()}>
              Error loading the channel.
            </Alert>
            <Container
              title="New Post"
              actions={
                <Button
                  type="button"
                  onClick={() => handleSubmit()}
                  variant="accent"
                  loading={isLoading}
                  disabled={!isValid || !dirty}
                >
                  Create Post
                </Button>
              }
            >
              <Form className="flex flex-col justify-start items-stretch gap-2">
                <Alert show={isError} fullWidth onClose={() => reset()}>
                  Error creating a post. Please try again.
                </Alert>
                <Field name="title">
                  {({ field, meta }: FieldProps) => (
                    <Input
                      {...field}
                      error={meta.error && meta.touched ? meta.error : undefined}
                      labelValue="Title"
                      fullWidth
                    />
                  )}
                </Field>
                <Field name="body">
                  {({ field, meta }: FieldProps) => (
                    <Textarea
                      {...field}
                      error={meta.error && meta.touched ? meta.error : undefined}
                      labelValue="Body"
                      fullWidth
                      size="sm"
                      resize
                    />
                  )}
                </Field>
              </Form>
            </Container>
          </div>
          <Dialog
            show={isExiting}
            onConfirm={() => navigate(`/channels/${textId}`)}
            onCancel={() => setIsExiting(false)}
            title="Discard Changes"
            body="Are you sure you want to discard your changes? This action cannot be undone."
            danger
          />
        </>
      )}
    </Formik>
  );
}
