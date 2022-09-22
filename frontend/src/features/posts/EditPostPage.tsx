import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetPostByUuidQuery, useUpdatePostMutation } from "../../app/enhancedApi";
import LoadingSpinner from "../../common/ui/LoadingSpinner";
import { Field, FieldProps, Form, Formik } from "formik";
import Button from "../../common/ui/Button";
import * as yup from "yup";
import { useEffect, useState } from "react";

interface EditPostFormValues {
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
  const { data, isLoading } = useGetPostByUuidQuery({ postUuid });
  const [updatePost, { isSuccess }] = useUpdatePostMutation();
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const initialValues: EditPostFormValues = {
    body: data ? data.post.body : "",
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/channels/${textId}/post/${postUuid}`);
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner size="h-8 w-8" />
      </div>
    );
  } else {
    if (data && !data.post.isAuthor) {
      return <Navigate to={`/channels/${textId}/post/${postUuid}`} replace />;
    } else {
      return (
        <div className="w-full bg-white rounded-md shadow px-4 py-2">
          <h1 className="text-lg font-bold">Edit Your Post</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={({ body }) => {
              updatePost({ updatePostRequestDto: { postUuid, body } });
            }}
          >
            {({ handleSubmit, dirty, isValid, isSubmitting, values }) => (
              <Form>
                <Field name="body">
                  {({ field }: FieldProps) => (
                    <div>
                      <textarea {...field} maxLength={40000} className="w-full"></textarea>
                    </div>
                  )}
                </Field>
                <div className="flex flex-row justify-between items-center w-full flex-wrap-reverse gap-2">
                  <div className="flex flex-row justify-start items-center gap-2 flex-wrap">
                    <Button type="submit" onClick={() => handleSubmit()} disabled={!dirty || !isValid}>
                      Save Changes
                    </Button>
                    {!isExiting && dirty && (
                      <Button type="button" onClick={() => setIsExiting(true)}>
                        Discard Changes
                      </Button>
                    )}
                    {isExiting && dirty && (
                      <Link to={`/channels/${textId}/post/${postUuid}`}>Confirm Discard Changes</Link>
                    )}
                    {isExiting && dirty && (
                      <Button type="button" onClick={() => setIsExiting(false)}>
                        Cancel
                      </Button>
                    )}
                    {!dirty && <Link to={`/channels/${textId}/post/${postUuid}`}>Back to Post</Link>}
                  </div>
                  <div className="text-secondary">{values.body.length} / 40000</div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      );
    }
  }
}
