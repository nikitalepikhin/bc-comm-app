import { useGetPostCommentsQuery } from "../../app/enhancedApi";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { GetPostCommentsApiArg } from "../../app/api";
import LoadingSpinner from "../../common/ui/LoadingSpinner";
import Comment from "../comments/Comment";

interface Props {
  page: number;
  isLastPage: boolean;
  order: GetPostCommentsApiArg["order"];
  setHasMore: (value: boolean) => void;
}

export default function PostCommentsSection(props: Props) {
  const { page, isLastPage, order, setHasMore } = props;
  const { postUuid } = useParams() as { postUuid: string };
  const { data, isLoading, isFetching, refetch } = useGetPostCommentsQuery({ postUuid, page, order });

  useEffect(() => {
    if (isLastPage && data && data.hasMore) {
      setHasMore(data.hasMore);
    }
  }, [isLastPage, data]);

  useEffect(() => {
    refetch();
  }, [page, order]);

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
          dateCreated={comment.dateCreated}
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
