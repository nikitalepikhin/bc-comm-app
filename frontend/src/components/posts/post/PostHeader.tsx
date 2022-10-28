import classNames from "classnames";
import { ClockIcon, UserIcon } from "@heroicons/react/20/solid";
import timeAgo from "../../../util/time";
import Badge from "../../uilib/Badge";
import PostContextMenu from "../PostContextMenu";
import { useContext } from "react";
import PostContext from "./PostContext";

export default function PostHeader() {
  const { author, created, modified, edited, showExpanded, isAuthor } = useContext(PostContext);

  return (
    <div className="flex flex-row justify-between items-center gap-2 flex-wrap w-full">
      <div
        className={classNames(
          "flex flex-row justify-start items-center gap-1 flex-wrap",
          "text-sm text-secondary dark:text-slate-400"
        )}
      >
        <div className="flex flex-row justify-center items-center gap-1">
          <UserIcon className="h-3 w-3" />
          <span>{author}</span>
        </div>
        <div>·</div>
        <div className="flex flex-row justify-center items-center gap-1">
          <ClockIcon className="h-3 w-3" />
          <span>{timeAgo.format(new Date(created))}</span>
        </div>
        {edited && showExpanded && <Badge extra={timeAgo.format(new Date(modified))}>edited</Badge>}
      </div>
      {showExpanded && isAuthor && <PostContextMenu />}
    </div>
  );
}
