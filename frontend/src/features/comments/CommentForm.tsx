import { Field, FieldProps, Form, Formik } from "formik";
import Button from "../../common/ui/Button";
import * as yup from "yup";
import { useCreateCommentMutation, useUpdateCommentMutation } from "../../app/enhancedApi";
import classNames from "classnames";

interface Props {
  postUuid: string;
  uuid?: string;
  body?: string;
  parentUuid?: string;
  onClose?: () => void;
}

interface NewCommentFormValues {
  body: string;
}

const validationSchema = yup.object({
  body: yup.string().required("Required").max(10000),
});

export default function CommentForm(props: Props) {
  const { uuid, body, postUuid, parentUuid, onClose } = props;
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const initialValues: NewCommentFormValues = {
    body: body ?? "",
  };

  const isCreating = parentUuid === undefined && uuid === undefined;
  const isReplying = parentUuid !== undefined && uuid === undefined;
  const isEditing = uuid !== undefined;

  return (
    <div className={classNames({ "pl-10": isReplying }, "w-full")}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (body !== undefined && uuid !== undefined) {
            updateComment({ updateCommentRequestDto: { body: values.body, uuid } });
          } else {
            createComment({ createCommentRequestDto: { postUuid, parentUuid, body: values.body } });
          }
          if (onClose !== undefined) {
            onClose();
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form className="flex flex-col justify-start items-center gap-2 w-full">
            <Field name="body">
              {({ field, meta }: FieldProps) => (
                <div className="flex flex-col w-full">
                  {isCreating && <label htmlFor={field.name}>Create new comment</label>}
                  {isEditing && <label htmlFor={field.name}>Edit your comment</label>}
                  {isReplying && <label htmlFor={field.name}>Reply to a comment</label>}
                  <textarea {...field} id={field.name}></textarea>
                  {meta.error && meta.touched && <p>{meta.error}</p>}
                </div>
              )}
            </Field>
            <div className="flex flex-row justify-end items-center gap-2 w-full">
              {onClose !== undefined && (
                <Button onClick={onClose} type="button" variant="outlined">
                  Cancel
                </Button>
              )}
              <Button type="button" onClick={() => handleSubmit()}>
                Comment
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
