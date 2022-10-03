import { ChannelPostDto } from "../../app/api";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
import LinkWithIcon from "../../common/ui/LinkWithIcon";
import { ChatBubbleBottomCenterTextIcon, ShareIcon } from "@heroicons/react/24/outline";
import timeAgo from "../../common/util/time";
import PostContextMenu from "./PostContextMenu";
import PostVotes from "./PostVotes";
import Badge from "../../common/ui/Badge";

interface Props extends ChannelPostDto {
  isFull?: boolean;
}

export default function Post(props: Props) {
  const { uuid, title, body, created, author, isAuthor, edited, up, down, dir, isFull = false, commentsCount } = props;
  const { textId } = useParams() as { textId: string; postUuid: string };

  return (
    <>
      <div className="py-2 px-4 shadow rounded-md w-full flex flex-row justify-between items-start gap-2">
        <PostVotes uuid={uuid} vote={dir} up={up} down={down} />
        <div className="flex flex-col justify-start grow">
          <div className="flex flex-row justify-between items-center gap-2 relative z-0">
            <div className="text-sm text-secondary flex flex-row justify-between items-center gap-2 flex-wrap">
              <div className="flex flex-row justify-start items-center gap-1">
                <span>{`Posted by ${author}`}</span>
                <span>·</span>
                <span>{timeAgo.format(new Date(created))}</span>
              </div>
              {edited && <Badge>Edited</Badge>}
            </div>
            <PostContextMenu isAuthor={isAuthor} uuid={uuid} textId={textId} isFull={isFull} />
          </div>
          {isFull ? (
            <h2 className="text-lg font-bold">{title}</h2>
          ) : (
            <Link
              to={`/channels/${textId}/post/${uuid}`}
              className="text-lg font-bold hover:text-accent transition-all"
            >
              {title}
            </Link>
          )}
          <div className={classNames("my-1 w-full", { "max-h-52 line-clamp-3": !isFull })}>{body}</div>
          <div className="flex flex-row justify-start items-center gap-2 text-sm flex-wrap">
            <LinkWithIcon
              to={`/channels/${textId}/post/${uuid}`}
              svg={<ChatBubbleBottomCenterTextIcon className="h-4 w-4" />}
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
      </div>
    </>
  );
}
