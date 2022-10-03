import { useParams } from "react-router-dom";
import { useState } from "react";
import { GetPostCommentsApiArg } from "../../app/api";
import PostCommentsSection from "./PostCommentsSection";
import Button from "../../common/ui/Button";
import { useGetPostByUuidQuery } from "../../app/enhancedApi";
import CommentForm from "../comments/CommentForm";

export default function PostCommentsPage() {
  const { postUuid } = useParams() as { postUuid: string };
  const [order, setOrder] = useState<GetPostCommentsApiArg["order"]>("new");
  const [page, setPage] = useState(1);
  const pages = Array.from(Array(page + 1).keys()).slice(1);
  const [hasMore, setHasMore] = useState(false);
  const { data } = useGetPostByUuidQuery({ postUuid });

  return (
    <div>
      {data && data.post.commentsCount > 0 ? (
        <div className="flex flex-row justify-start items-center gap-2">
          <Button
            variant="standard"
            onClick={() => {
              setPage(1);
              setHasMore(false);
              setOrder("new");
            }}
          >
            New
          </Button>
          <Button
            variant="standard"
            onClick={() => {
              setPage(1);
              setHasMore(false);
              setOrder("top");
            }}
          >
            Top
          </Button>
        </div>
      ) : (
        <div className="w-full text-center px-4 py-2">
          It's quite in here... 😴
          <br />
          Be the first to leave a comment.
        </div>
      )}
      <CommentForm postUuid={postUuid} />
      {pages.map((page, index) => (
        <PostCommentsSection
          key={page}
          page={page}
          isLastPage={index === pages.length - 1}
          order={order}
          setHasMore={(value) => {
            console.log(`setting has more to ${String(value)}`);
            setHasMore(value);
          }}
        />
      ))}
      {hasMore && (
        <Button
          type="button"
          variant="standard"
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
