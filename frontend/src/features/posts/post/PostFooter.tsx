import { useParams } from "react-router-dom";
import { useContext } from "react";
import PostContext from "./PostContext";
import classNames from "classnames";
import LinkWithIcon from "../../../common/uilib/LinkWithIcon";
import { ArrowUpOnSquareIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export default function PostFooter() {
  const { textId } = useParams();

  const { uuid, commentsCount, showExpanded, channelTextId } = useContext(PostContext);

  return (
    <div
      className={classNames(
        "flex flex-row justify-start items-center gap-2 w-full flex-wrap",
        "text-sm text-secondary dark:text-slate-400"
      )}
    >
      {showExpanded ? (
        <div className="flex flex-row justify-between items-center gap-1">
          <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
          <span>{`${commentsCount} comments`}</span>
        </div>
      ) : (
        <LinkWithIcon
          to={`/channels/${textId ?? channelTextId}/post/${uuid}`}
          icon={<ChatBubbleBottomCenterTextIcon className="h-4 w-4" />}
        >{`${commentsCount} comments`}</LinkWithIcon>
      )}
      <button
        onClick={async () => {
          const link = window.location.host + `/channels/${channelTextId ?? textId}/post/${uuid}`;
          await navigator.clipboard.writeText(link);
          // todo - add a notification
        }}
        type="button"
        className={classNames(
          "flex flex-row justify-between items-center gap-0.5",
          "text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
        )}
      >
        <ArrowUpOnSquareIcon className="h-4 w-4" />
        <span>Share</span>
      </button>
    </div>
  );
}
