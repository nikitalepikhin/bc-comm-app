import classNames from "classnames";
import { ClockIcon, UserIcon } from "@heroicons/react/20/solid";
import timeAgo from "../../../util/time";
import Badge from "../../uilib/Badge";
import PostContextMenu from "../PostContextMenu";
import { useContext } from "react";
import PostContext from "./PostContext";
import StyledLink from "../../uilib/StyledLink";

export default function PostHeader() {
  const { author, created, modified, edited, showExpanded, isAuthor, authorIsTeacher } = useContext(PostContext);

  return (
    <div className="flex flex-row justify-between items-center gap-2 w-full">
      <div
        className={classNames(
          "flex flex-row justify-start items-center gap-1",
          "text-sm text-secondary dark:text-slate-400"
        )}
      >
        <div className="flex flex-row justify-center items-center gap-1">
          <UserIcon className="h-3 w-3" />
          {!authorIsTeacher && <span>{author}</span>}
          {authorIsTeacher && <StyledLink to={`/profile/teacher/${author}`}>{author}</StyledLink>}
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
