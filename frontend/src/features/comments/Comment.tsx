import { PostCommentDto } from "../../app/api";
import classNames from "classnames";
import timeAgo from "../../common/util/time";
import Badge from "../../common/ui/Badge";
import StyledLink from "../../common/ui/StyledLink";
import { useState } from "react";
import CommentForm from "./CommentForm";
import Dialog from "../../common/ui/Dialog";
import { useDeleteCommentMutation } from "../../app/enhancedApi";
import { useParams } from "react-router-dom";
import Votes from "../../common/components/Votes";

interface Props {
  uuid: string;
  body: string;
  author: string;
  isAuthor: boolean;
  created: string;
  modified: string;
  edited: boolean;
  up: number;
  down: number;
  dir: number;
  hasMore: boolean;
  level: number;
  children: PostCommentDto[];
}

export default function Comment(props: Props) {
  const { uuid, body, author, isAuthor, created, modified, edited, up, down, dir, children, hasMore, level } = props;
  const { postUuid, textId } = useParams() as { textId: string; postUuid: string };
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteComment] = useDeleteCommentMutation();

  return (
    <>
      <div
        className={classNames(
          "flex flex-col gap-2 justify-start items-start bg-white rounded-md shadow px-4 py-2",
          { "ml-[20px]": level === 2 },
          { "ml-[40px]": level === 3 },
          { "ml-[60px]": level === 4 },
          { "ml-[80px]": level === 5 },
          { "ml-[100px]": level === 6 }
        )}
      >
        <div className="flex flex-row justify-between items-center gap-2 w-full">
          <div className="flex flex-row justify-between items-center gap-1 text-sm text-secondary">
            <div>{author}</div>
            <div>·</div>
            <div>{`${timeAgo.format(new Date(created))}`}</div>
            {edited && (
              <>
                <div>·</div>
                <div>{`edited ${timeAgo.format(new Date(modified))}`}</div>
              </>
            )}
          </div>
          {edited && <Badge>Edited</Badge>}
        </div>
        {isEditing ? (
          <CommentForm postUuid={postUuid} body={body} uuid={uuid} onClose={() => setIsEditing(false)} />
        ) : (
          <div className="w-full">{body}</div>
        )}
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <Votes uuid={uuid} currentVote={dir} up={up} down={down} mode="comment" />
          <button type="button" onClick={() => setIsReplying(true)}>
            Reply
          </button>
          {isAuthor && (
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText(
                window.location.origin + `/channels/${textId}/post/${postUuid}/comment/${uuid}`
              )
            }
          >
            Share
          </button>
          {isAuthor && (
            <button type="button" onClick={() => setIsDeleting(true)}>
              Delete
            </button>
          )}
        </div>
        {isReplying && <CommentForm postUuid={postUuid} parentUuid={uuid} onClose={() => setIsReplying(false)} />}
      </div>
      {hasMore && (
        <div className={"ml-[100px]"}>
          <StyledLink to={`/channels/${textId}/post/${postUuid}/comment/${uuid}`}>Show more in this thread</StyledLink>
        </div>
      )}
      {children.map((comment) => (
        <Comment
          key={comment.uuid}
          uuid={comment.uuid}
          body={comment.body}
          author={comment.author}
          isAuthor={comment.isAuthor}
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
      <Dialog
        show={isDeleting}
        title="Delete comment"
        body="Are you sure you want to delete your comment?"
        onConfirm={() => {
          setIsDeleting(false);
          deleteComment({ deleteCommentRequestDto: { uuid } });
        }}
        onCancel={() => setIsDeleting(false)}
        confirmText="Delete"
        cancelText="Keep"
      />
    </>
  );
}
