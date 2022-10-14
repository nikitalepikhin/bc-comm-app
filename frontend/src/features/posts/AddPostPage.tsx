import { Field, FieldProps, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/uilib/Button";
import { useCreatePostMutation, useGetChannelByTextIdQuery } from "../../app/enhancedApi";
import LoadingSpinner from "../../common/uilib/LoadingSpinner";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import Box from "../../common/uilib/Box";
import Input from "../../common/uilib/Input";
import Textarea from "../../common/uilib/Textarea";
import Dialog from "../../common/uilib/Dialog";
import Container from "../../common/uilib/Container";

interface AddPostFormValues {
  title: string;
  body: string;
}

const initialValues: AddPostFormValues = {
  title: "",
  body: "",
};

export default function AddPostPage() {
  const { textId } = useParams() as { textId: string };
  const navigate = useNavigate();
  const [createPost, { data: createPostData, isSuccess, isLoading }] = useCreatePostMutation();
  const { data, isFetching: getChannelByTextIdIsFetching } = useGetChannelByTextIdQuery({ textId });
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
      initialValues={initialValues}
      onSubmit={async ({ title, body }) => {
        if (data) {
          await createPost({ createPostRequestDto: { channelUuid: data.uuid, title, body } });
        }
      }}
    >
      {({ handleSubmit, isValid, dirty }) => (
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
                  />
                )}
              </Field>
            </Form>
          </Container>
          <Dialog
            show={isExiting}
            onConfirm={() => navigate(`/channels/${textId}`)}
            onCancel={() => setIsExiting(false)}
            title="Discard Changes"
            body="Are you sure you want to discard your changes? This action cannot be undone."
            danger
          />
        </div>
      )}
    </Formik>
  );
}
