import { Field, FieldProps, Form, Formik } from "formik";
import Button from "../uilib/Button";
import * as yup from "yup";
import { useCreateCommentMutation, useUpdateCommentMutation } from "../../app/enhancedApi";
import classNames from "classnames";
import Textarea from "../uilib/Textarea";
import Dialog from "../uilib/dialog/Dialog";
import React, { useEffect } from "react";
import Alert from "../uilib/Alert";
import { useAppSelector } from "../../app/redux/hooks";

interface Props {
  postUuid: string;
  uuid?: string;
  body?: string;
  parentUuid?: string;
  onClose?: () => void;
  setInitialDatetime?: (value: Date) => void;
}

interface FormValues {
  body: string;
}

const validationSchema = yup.object({
  body: yup
    .string()
    .required("Required")
    .test("length", "Value is too long", (value) => (value ? value.length <= 10000 : true)),
});

export default function CommentForm(props: Props) {
  const { uuid, body, postUuid, parentUuid, onClose, setInitialDatetime } = props;
  const [createComment, { isLoading: createLoading, isError: createError }] = useCreateCommentMutation();
  const [updateComment, { isLoading: updateLoading, isError: updateError }] = useUpdateCommentMutation();
  const initialValues: FormValues = {
    body: body ?? "",
  };
  const { verified } = useAppSelector((state) => state.auth.user);

  const isCreating = parentUuid === undefined && uuid === undefined;
  const isEditing = uuid !== undefined;

  const isLoading = createLoading || updateLoading;
  const isError = createError || updateError;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnMount
        validateOnChange
        onSubmit={async (values, { resetForm }) => {
          if (body !== undefined && uuid !== undefined) {
            updateComment({ updateCommentRequestDto: { body: values.body, uuid, postUuid } });
          } else {
            await createComment({ createCommentRequestDto: { postUuid, parentUuid, body: values.body } });
          }
          if (onClose !== undefined) {
            onClose();
          }
          resetForm();
        }}
      >
        {({ handleSubmit, dirty, isValid, values }) => (
          <div className={classNames("w-full")}>
            <Form className="flex flex-col justify-start items-center gap-2 w-full">
              <Field name="body">
                {({ field, meta }: FieldProps) => (
                  <Textarea
                    {...field}
                    disabled={!verified}
                    fullWidth
                    size={isEditing ? "xxs" : "xs"}
                    error={!isCreating && meta.touched && meta.error ? meta.error : undefined}
                    placeholder={isCreating ? "New Comment" : isEditing ? "Edit Your Comment" : "Reply to This Comment"}
                  />
                )}
              </Field>
              <Alert show={isError} fullWidth>{`Error ${
                isEditing ? "updating the" : "creating a"
              } comment. Please try again.`}</Alert>
              <div className="flex flex-row justify-end items-center gap-2 w-full">
                {!isCreating && (
                  <Button key="cancel" onClick={onClose} type="button">
                    Cancel
                  </Button>
                )}
                <Button
                  key="comment"
                  type="button"
                  variant="accent"
                  disabled={!dirty || !isValid || !verified}
                  loading={isLoading}
                  onClick={() => {
                    if (setInitialDatetime !== undefined) {
                      const date = new Date();
                      setInitialDatetime(date);
                    }
                    handleSubmit();
                  }}
                >
                  {isCreating ? "Comment" : isEditing ? "Update" : "Reply"}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
