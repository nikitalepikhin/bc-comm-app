import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import LinkWithIcon from "../../common/uilib/LinkWithIcon";
import { ChatBubbleBottomCenterTextIcon, ShareIcon } from "@heroicons/react/24/outline";
import timeAgo from "../../common/util/time";
import PostContextMenu from "./PostContextMenu";
import Votes from "../../common/components/Votes";
import Badge from "../../common/uilib/Badge";
import StyledLink from "../../common/uilib/StyledLink";
import Dialog from "../../common/uilib/Dialog";
import { useEffect, useState } from "react";
import { useDeletePostMutation } from "../../app/enhancedApi";
import Box from "../../common/uilib/Box";

interface Props {
  isFull?: boolean;
  uuid: string;
  channelTextId?: string;
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
}

export default function Post(props: Props) {
  const {
    uuid,
    title,
    body,
    created,
    modified,
    author,
    isAuthor,
    edited,
    up,
    down,
    dir,
    isFull = false,
    commentsCount,
    channelTextId,
  } = props;
  const { textId } = useParams() as { textId: string };
  const [deletePost, { isSuccess, isLoading }] = useDeletePostMutation();
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/channels/${textId}`);
    }
  }, [isSuccess]);

  return (
    <>
      <Box className="flex flex-row justify-between items-start gap-2">
        <Votes uuid={uuid} currentVote={dir} up={up} down={down} mode="post" />
        <div className="flex flex-col justify-start grow">
          <div className="flex flex-row justify-between items-center gap-2 relative z-0">
            <div className="text-sm text-secondary flex flex-row justify-between items-center gap-2 flex-wrap">
              <div className="flex flex-row justify-start items-center gap-1 flex-wrap">
                {channelTextId !== undefined && (
                  <>
                    <StyledLink to={`/channels/${channelTextId}`}>{channelTextId}</StyledLink>
                    <span>·</span>
                  </>
                )}
                <span>{`Posted by ${author}`}</span>
                <span>·</span>
                <span>{timeAgo.format(new Date(created))}</span>
                {edited && (
                  <>
                    <span>·</span>
                    <span>{`edited ${timeAgo.format(new Date(modified))}`}</span>
                  </>
                )}
              </div>
              {edited && <Badge>Edited</Badge>}
            </div>
            {textId !== undefined && (
              <PostContextMenu
                isAuthor={isAuthor}
                uuid={uuid}
                textId={textId}
                isFull={isFull}
                onDelete={() => setDeleteInProgress(true)}
              />
            )}
          </div>
          {isFull ? (
            <h2 className="text-lg font-bold">{title}</h2>
          ) : (
            <Link
              to={`/channels/${textId ?? channelTextId}/post/${uuid}`}
              className="text-lg font-bold hover:text-accent transition-all"
            >
              {title}
            </Link>
          )}
          <div className={classNames("my-1 w-full", { "max-h-52 line-clamp-3": !isFull })}>{body}</div>
          <div className="flex flex-row justify-start items-center gap-2 text-sm flex-wrap">
            <LinkWithIcon
              to={`/channels/${textId ?? channelTextId}/post/${uuid}`}
              icon={<ChatBubbleBottomCenterTextIcon className="h-4 w-4" />}
            >
              {`${commentsCount} Comments`}
            </LinkWithIcon>
            <button
              type="button"
              className="flex flex-row justify-start items-center gap-1 text-accent hover:text-accent-strong"
              onClick={() => navigator.clipboard.writeText(window.location.href + (!isFull ? `/post/${uuid}` : ""))}
            >
              <ShareIcon className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </Box>
      <Dialog
        show={deleteInProgress}
        title="Delete Post"
        body="Are you sure you want to delete your post?"
        size="xs"
        cancelText="Keep"
        confirmText="Delete"
        danger
        onCancel={() => setDeleteInProgress(false)}
        onConfirm={() => deletePost({ deletePostRequestDto: { postUuid: uuid } })}
        loading={isLoading}
      />
    </>
  );
}
