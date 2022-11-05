import { PostCommentDto } from "../../../app/api";
import classNames from "classnames";
import timeAgo from "../../../util/time";
import Badge from "../../uilib/Badge";
import StyledLink from "../../uilib/StyledLink";
import { useEffect, useState } from "react";
import CommentForm from "../CommentForm";
import Dialog from "../../uilib/dialog/Dialog";
import { useDeleteCommentMutation } from "../../../app/enhancedApi";
import { useNavigate, useParams } from "react-router-dom";
import Votes from "../../common/Votes";
import Box from "../../uilib/Box";
import Button from "../../uilib/Button";
import CommentHeader from "./CommentHeader";
import CommentFooter, { onCommentShare } from "./CommentFooter";
import LinkWithIcon from "../../uilib/LinkWithIcon";
import { ArrowDownRightIcon } from "@heroicons/react/24/solid";

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
  const [deleteComment, { isLoading, isSuccess }] = useDeleteCommentMutation();
  const levels = Array.from(Array(level + 1).keys()).slice(2);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setIsDeleting(false);
      navigate(`/channels/${textId}/post/${postUuid}`);
    }
  }, [isSuccess]);

  return (
    <>
      <div className={classNames("flex flex-row justify-start")}>
        {levels.map((lvl) => (
          <div
            key={lvl}
            className={classNames(
              "border-r-2 border-slate-300 dark:border-slate-600",
              { "w-3 md:w-6": lvl === 2 },
              { "w-6 md:w-12": lvl > 2 }
            )}
          />
        ))}
        <Box
          className={classNames("flex flex-col gap-2 justify-start items-start grow shrink", "my-2", {
            "ml-3 md:ml-6": level > 1,
          })}
        >
          <CommentHeader
            author={author}
            created={created}
            modified={modified}
            edited={edited}
            isAuthor={isAuthor}
            onEditClick={() => setIsEditing(true)}
            onDeleteClick={() => setIsDeleting(true)}
            onShareClick={() => onCommentShare(textId, postUuid, uuid)}
          />
          {isEditing ? (
            <CommentForm postUuid={postUuid} body={body} uuid={uuid} onClose={() => setIsEditing(false)} />
          ) : (
            <div className="w-full break-words">{body}</div>
          )}
          <CommentFooter
            uuid={uuid}
            postUuid={postUuid}
            dir={dir}
            up={up}
            down={down}
            isAuthor={isAuthor}
            setIsEditing={setIsEditing}
            setIsDeleting={setIsDeleting}
            setIsReplying={setIsReplying}
          />
          {isReplying && <CommentForm postUuid={postUuid} parentUuid={uuid} onClose={() => setIsReplying(false)} />}
        </Box>
      </div>
      {hasMore && (
        <div className="flex flex-row justify-start">
          {levels.map((lvl) => (
            <div
              key={lvl}
              className={classNames(
                "border-r-2 border-slate-300 dark:border-slate-600",
                { "w-3 md:w-6": lvl === 2 },
                { "w-6 md:w-12": lvl > 2 }
              )}
            />
          ))}
          <LinkWithIcon
            icon={<ArrowDownRightIcon className="h-4 w-4" />}
            position="right"
            to={`/channels/${textId}/post/${postUuid}/comment/${uuid}`}
            className="ml-3 md:ml-6"
          >
            Show more in this thread
          </LinkWithIcon>
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
        title="Delete Comment"
        body="Are you sure you want to delete your comment? This action cannot be undone."
        onConfirm={() => deleteComment({ deleteCommentRequestDto: { uuid, postUuid } })}
        onCancel={() => setIsDeleting(false)}
        confirmText="Delete"
        cancelText="Keep"
        loading={isLoading}
        danger
      />
    </>
  );
}
