import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetPostByUuidQuery, useUpdatePostMutation } from "../../app/enhancedApi";
import LoadingSpinner from "../../common/uilib/LoadingSpinner";
import { Field, FieldProps, Form, Formik } from "formik";
import Button from "../../common/uilib/Button";
import * as yup from "yup";
import { useEffect, useState } from "react";
import LinkWithIcon from "../../common/uilib/LinkWithIcon";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Box from "../../common/uilib/Box";
import Textarea from "../../common/uilib/Textarea";
import Input from "../../common/uilib/Input";
import Alert from "../../common/uilib/Alert";
import Dialog from "../../common/uilib/Dialog";
import Container from "../../common/uilib/Container";

interface EditPostFormValues {
  title: string;
  body: string;
}

const validationSchema = yup.object({
  body: yup
    .string()
    .test("You have reached a limit of 40000 characters.", (value) => (value ? value.length <= 40000 : false))
    .required("Required"),
});

export default function EditPostPage() {
  const { textId, postUuid } = useParams() as { textId: string; postUuid: string };
  const { data, isFetching } = useGetPostByUuidQuery({ postUuid });
  const [updatePost, { isSuccess, isLoading }] = useUpdatePostMutation();
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const initialValues: EditPostFormValues = {
    title: data ? data.post.title : "",
    body: data ? data.post.body : "",
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/channels/${textId}/post/${postUuid}`);
    }
  }, [isSuccess]);

  if (isFetching) {
    return <LoadingSpinner />;
  }

  if (data && !data.post.isAuthor) {
    return <Navigate to={`/channels/${textId}/post/${postUuid}`} replace />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={({ body }) => {
        updatePost({ updatePostRequestDto: { postUuid, body } });
      }}
    >
      {({ dirty, handleSubmit, isValid }) => (
        <div className="flex flex-col justify-start items-stretch w-full gap-2">
          <div className="flex flex-row justify-end items-center w-full">
            <Button
              className="w-full"
              onClick={() => {
                if (dirty) {
                  setIsExiting(true);
                } else {
                  navigate(`/channels/${textId}/post/${postUuid}`);
                }
              }}
              icon={<XMarkIcon className="h-5 w-5" />}
            >
              Close
            </Button>
          </div>
          <Container
            title="Edit Post"
            actions={
              <Button
                type="button"
                onClick={() => handleSubmit()}
                variant="accent"
                loading={isLoading}
                disabled={!isValid || !dirty}
              >
                Update Post
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
                    disabled
                  />
                )}
              </Field>
              <Alert fullWidth show severity="info">
                Editing the post title is not allowed.
              </Alert>
              <Field name="body">
                {({ field, meta }: FieldProps) => (
                  <Textarea
                    {...field}
                    error={meta.error && meta.touched ? meta.error : undefined}
                    labelValue="Body"
                    fullWidth
                    showCharCount
                    maxLength={40000}
                  />
                )}
              </Field>
            </Form>
          </Container>
          <Dialog
            show={isExiting}
            onConfirm={() => navigate(`/channels/${textId}/post/${postUuid}`)}
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
