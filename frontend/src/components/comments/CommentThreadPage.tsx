import { useParams } from "react-router-dom";
import StyledLink from "../uilib/StyledLink";
import { useGetCommentCommentsQuery } from "../../app/enhancedApi";
import LoadingSpinner from "../uilib/LoadingSpinner";
import Comment from "./comment/Comment";
import ErrorPage from "../common/ErrorPage";

export default function CommentThreadPage() {
  const { textId, postUuid, commentUuid } = useParams() as { textId: string; postUuid: string; commentUuid: string };
  const { data, isLoading, isError, error } = useGetCommentCommentsQuery({ commentUuid });

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="flex flex-col justify-start items-center w-full gap-2">
      <div className="self-start">
        <StyledLink to={`/channels/${textId}/post/${postUuid}`}>View all comments</StyledLink>
      </div>
      {data?.comments[0]?.rootUuid !== null && data?.comments[0]?.parentUuid !== null && (
        <div className="self-start">
          <StyledLink to={`/channels/${textId}/post/${postUuid}/comment/${data?.comments[0]?.rootUuid}`}>
            Show root comment
          </StyledLink>
        </div>
      )}
      {data?.comments[0]?.parentUuid !== null && (
        <div className="self-start">
          <StyledLink to={`/channels/${textId}/post/${postUuid}/comment/${data?.comments[0]?.parentUuid}`}>
            Show parent comment
          </StyledLink>
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      <div className="w-full">
        {data?.comments.map((comment) => (
          <Comment
            key={comment.uuid}
            uuid={comment.uuid}
            body={comment.body}
            author={comment.author}
            isAuthor={comment.isAuthor}
            authorIsTeacher={comment.authorIsTeacher}
            created={comment.created}
            modified={comment.modified}
            edited={comment.edited}
            up={comment.up}
            down={comment.down}
            dir={comment.dir}
            hasMore={comment.hasMore}
            level={comment.level}
          >
            {comment.comments}
          </Comment>
        ))}
      </div>
    </div>
  );
}
