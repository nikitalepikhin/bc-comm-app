import classNames from "classnames";
import timeAgo from "../../../util/time";
import Badge from "../../uilib/Badge";
import CommentContextMenu from "./CommentContextMenu";
import { ClockIcon, UserIcon } from "@heroicons/react/20/solid";

interface Props {
  author: string;
  created: string;
  modified: string;
  edited: boolean;
  isAuthor: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onShareClick: () => void;
}

export default function CommentHeader(props: Props) {
  const { author, created, modified, edited, isAuthor, onEditClick, onDeleteClick, onShareClick } = props;

  return (
    <div className="flex flex-row justify-between items-center gap-2 w-full flex-wrap">
      <div
        className={classNames(
          "flex flex-row justify-between items-center gap-1 flex-wrap",
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
        {edited && <Badge extra={timeAgo.format(new Date(modified))}>Edited</Badge>}
      </div>
      <CommentContextMenu
        isAuthor={isAuthor}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        onShareClick={onShareClick}
      />
    </div>
  );
}
