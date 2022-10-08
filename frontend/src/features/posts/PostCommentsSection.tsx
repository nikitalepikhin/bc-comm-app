import { useGetPostCommentsQuery } from "../../app/enhancedApi";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { GetPostCommentsApiArg } from "../../app/api";
import Comment from "../comments/Comment";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface Props {
  page: number;
  isLastPage: boolean;
  order: GetPostCommentsApiArg["order"];
  setHasMore: (value: boolean) => void;
}

export default function PostCommentsSection(props: Props) {
  const { page, isLastPage, order, setHasMore } = props;
  const { postUuid } = useParams() as { postUuid: string };
  const { postCommentsRequestDate } = useAppSelector((state) => state.comments);
  const { data, refetch } = useGetPostCommentsQuery({
    postUuid,
    page,
    order,
    after: postCommentsRequestDate,
  });

  useEffect(() => {
    if (isLastPage && data && data.hasMore) {
      setHasMore(data.hasMore);
    }
  }, [isLastPage, data, setHasMore]);

  useEffect(() => {
    refetch();
  }, [page, order, setHasMore, refetch]);

  return (
    <>
      {data?.comments.map((comment) => (
        <Comment
          key={comment.uuid}
          uuid={comment.uuid}
          body={comment.body}
          edited={comment.edited}
          isAuthor={comment.isAuthor}
          author={comment.author}
          created={comment.created}
          modified={comment.modified}
          up={comment.up}
          down={comment.down}
          dir={comment.dir}
          hasMore={comment.hasMore}
          level={comment.level}
        >
          {comment.comments}
        </Comment>
      ))}
    </>
  );
}
