import { useParams } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { GetPostCommentsApiArg } from "../../app/api";
import PostCommentsSection from "./PostCommentsSection";
import Button from "../../common/uilib/Button";
import { useGetPostByUuidQuery } from "../../app/enhancedApi";
import CommentForm from "../comments/CommentForm";
import Box from "../../common/uilib/Box";
import { Field, FieldProps, Form, Formik } from "formik";
import RadioGroup from "../../common/uilib/RadioGroup";

interface FormValues {
  sort: "new" | "top";
}

const initialValues: FormValues = {
  sort: "new",
};

export default function PostCommentsPage() {
  const { postUuid } = useParams() as { postUuid: string };
  const [order, setOrder] = useState<GetPostCommentsApiArg["order"]>("new");
  const [page, setPage] = useState(1);
  const pages = Array.from(Array(page + 1).keys()).slice(1);
  const [hasMore, setHasMore] = useState(false);
  const { data, isLoading } = useGetPostByUuidQuery({ postUuid });

  return (
    <div>
      {!isLoading && data && data.post.commentsCount > 0 && (
        <Formik
          initialValues={initialValues}
          onSubmit={({ sort }) => {
            setPage(1);
            setHasMore(false);
            setOrder(sort);
          }}
        >
          {({ handleSubmit }) => (
            <Form className="mb-2">
              <Field name="sort">
                {({ field }: FieldProps) => (
                  <RadioGroup
                    {...field}
                    onChange={(e: ChangeEvent) => {
                      field.onChange(e);
                      handleSubmit();
                    }}
                    defaultValue="new"
                    options={[
                      { value: "new", label: "New" },
                      { value: "top", label: "Top" },
                    ]}
                  />
                )}
              </Field>
            </Form>
          )}
        </Formik>
      )}
      {!isLoading && (
        <Box className="mb-2">
          <CommentForm postUuid={postUuid} onClose={() => setOrder("new")} />
        </Box>
      )}
      {!isLoading && data && data.post.commentsCount === 0 && (
        <Box className="flex flex-col justify-center items-center text-center w-full py-6">
          It's quite in here... 😴
          <br />
          Be the first to leave a comment.
        </Box>
      )}
      {pages.map((page, index) => (
        <PostCommentsSection
          key={page}
          page={page}
          isLastPage={index === pages.length - 1}
          order={order}
          setHasMore={(value) => setHasMore(value)}
        />
      ))}
      {hasMore && (
        <Button
          type="button"
          variant="default"
          onClick={() => {
            setPage(page + 1);
            setHasMore(false);
          }}
        >
          Load more comments
        </Button>
      )}
    </div>
  );
}
