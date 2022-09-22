import { ChannelPostDto } from "../../app/api";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import { useVoteOnPostMutation } from "../../app/enhancedApi";
import classNames from "classnames";
import LinkWithIcon from "../../common/ui/LinkWithIcon";
import { ChatBubbleBottomCenterTextIcon, ShareIcon } from "@heroicons/react/24/outline";
import timeAgo from "../../common/util/time";
import PostContextMenu from "./PostContextMenu";
import PostVotes from "./PostVotes";

export type PostDisplayMode = "full" | "reduced";

interface Props extends ChannelPostDto {
  mode?: PostDisplayMode;
}

export default function Post(props: Props) {
  const { uuid, title, body, created, author, isAuthor, edited, up, down, vote, mode = "reduced" } = props;
  const { textId } = useParams() as { textId: string; postUuid: string };

  return (
    <div className="py-2 px-4 shadow rounded-md w-full flex flex-row justify-between items-start gap-2">
      <PostVotes uuid={uuid} vote={vote} up={up} down={down} />
      <div className="flex flex-col justify-start grow">
        <div className="flex flex-row justify-between items-center gap-2 relative">
          <div className="text-sm text-secondary flex flex-row justify-between items-center gap-2 flex-wrap">
            <div>
              Posted by <span>{author}</span> <span>{timeAgo.format(new Date(created))}</span>
            </div>
            {edited && <div className="uppercase bg-secondary rounded-md px-2 py-0.5 text-white text-xs">Edited</div>}
          </div>
          <PostContextMenu isAuthor={isAuthor} uuid={uuid} textId={textId} mode={mode} />
        </div>
        {mode === "reduced" ? (
          <Link to={`/channels/${textId}/post/${uuid}`} className="text-lg font-bold hover:text-accent transition-all">
            {title}
          </Link>
        ) : (
          <h2 className="text-lg font-bold">{title}</h2>
        )}
        <div className={classNames("my-1 w-full", { "max-h-52 line-clamp-3": mode === "reduced" })}>{body}</div>
        <div className="flex flex-row justify-start items-center gap-2 text-sm flex-wrap">
          {mode === "reduced" ? (
            <LinkWithIcon
              to={`/channels/${textId}/post/${uuid}`}
              svg={<ChatBubbleBottomCenterTextIcon className="h-4 w-4" />}
            >
              12 Comments
            </LinkWithIcon>
          ) : (
            <div className="flex flex-row justify-start items-center gap-1">
              <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
              <span>12 Comments</span>
            </div>
          )}
          <button
            type="button"
            className="flex flex-row justify-start items-center gap-1 text-accent hover:text-accent-strong"
            onClick={() =>
              navigator.clipboard.writeText(window.location.href + (mode === "reduced" ? `/post/${uuid}` : ""))
            }
          >
            <ShareIcon className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
