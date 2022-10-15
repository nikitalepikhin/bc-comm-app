import Box from "../../../common/uilib/Box";
import classNames from "classnames";
import Votes from "../../../common/components/Votes";
import PostHeader from "./PostHeader";
import PostContext from "./PostContext";
import { useDeletePostMutation } from "../../../app/enhancedApi";
import StyledLink from "../../../common/uilib/StyledLink";
import Dialog from "../../../common/uilib/Dialog";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostFooter from "./PostFooter";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export interface Props {
  uuid: string;
  title: string;
  body: string;
  created: string;
  modified: string;
  author: string;
  isAuthor: boolean;
  edited: boolean;
  up: number;
  down: number;
  dir: number;
  commentsCount: number;
  channelTextId?: string;
  showExpanded?: boolean;
}

export default function Post(props: Props) {
  const { uuid, title, body, up, down, dir, channelTextId, showExpanded = false } = props;

  const { textId } = useParams() as { textId: string };
  const [deletePost, { isLoading, isSuccess }] = useDeletePostMutation();
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/channels/${textId ?? channelTextId}`, { replace: true });
    }
  }, [isSuccess]);

  return (
    <PostContext.Provider value={{ ...props, onDelete: () => setDeleteInProgress(true) }}>
      <Box
        className={classNames("flex flex-col justify-start items-start gap-2", {
          "pt-2": !showExpanded && channelTextId !== undefined,
        })}
      >
        {!showExpanded && channelTextId !== undefined && (
          <div
            className={classNames(
              "border-b border-slate-200 dark:border-slate-700 w-full",
              "flex flex-row justify-start items-center gap-1",
              "pb-1"
            )}
          >
            <span className="text-sm text-secondary dark:text-slate-400">Posted in</span>
            <Link to={`/channels/${channelTextId}`} className={classNames("text-primary dark:text-white text-sm")}>
              {channelTextId}
            </Link>
          </div>
        )}
        <div className={classNames("flex flex-row justify-start items-start gap-2 w-full")}>
          <Votes mode="post" uuid={uuid} currentVote={dir} up={up} down={down} />
          <div className={classNames("flex flex-col justify-start items-start gap-1 w-full")}>
            <PostHeader />
            {showExpanded ? (
              <div className="text-lg font-bold">{title}</div>
            ) : (
              <Link
                to={`/channels/${textId ?? channelTextId}/post/${uuid}`}
                className="text-lg font-bold hover:underline"
              >
                {title}
              </Link>
            )}
            <div>{body}</div>
            <PostFooter />
          </div>
        </div>
      </Box>
      <Dialog
        show={deleteInProgress}
        title="Delete Post"
        body="Are you sure you want to delete your post? This action cannot be undone."
        cancelText="Keep"
        confirmText="Delete"
        danger
        onCancel={() => setDeleteInProgress(false)}
        onConfirm={() => deletePost({ deletePostRequestDto: { postUuid: uuid } })}
        loading={isLoading}
      />
    </PostContext.Provider>
  );
}
