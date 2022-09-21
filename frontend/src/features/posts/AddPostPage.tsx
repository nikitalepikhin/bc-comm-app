import { Field, FieldProps, Form, Formik } from "formik";
import { Navigate, useParams } from "react-router-dom";
import Button from "../../common/ui/Button";
import { useCreatePostMutation, useGetChannelByTextIdQuery } from "../../app/enhancedApi";
import LoadingSpinner from "../../common/ui/LoadingSpinner";

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
  const [createPost, { data: createPostData, isSuccess, isLoading }] = useCreatePostMutation();
  const { data, isFetching: getChannelByTextIdIsFetching } = useGetChannelByTextIdQuery({ textId });

  if (getChannelByTextIdIsFetching) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return isSuccess ? (
    <Navigate to={`/channels/${textId}/post/${createPostData!.uuid}`} />
  ) : (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async ({ title, body }) => {
          if (data) {
            await createPost({ createPostRequestDto: { channelUuid: data.uuid, title, body } });
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form>
            <Field name="title">
              {({ field }: FieldProps) => (
                <div>
                  <label htmlFor="title">Title</label>
                  <input type="text" id="tile" {...field} />
                </div>
              )}
            </Field>
            <Field name="body">
              {({ field }: FieldProps) => (
                <div>
                  <label htmlFor="body">Body</label>
                  <textarea {...field} id="body" />
                </div>
              )}
            </Field>
            <div>
              <Button type="submit" onClick={() => handleSubmit()}>
                Create Post
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
