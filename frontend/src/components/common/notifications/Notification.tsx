import { NotificationDto } from "../../../app/api";
import timeAgo from "../../../util/time";
import classNames from "classnames";
import IconButton from "../../uilib/IconButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDismissUserNotificationMutation } from "../../../app/enhancedApi";
import Alert from "../../uilib/Alert";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PopoverContext } from "../../uilib/Popover";

interface Props extends NotificationDto {}

export default function Notification(props: Props) {
  const { notificationUuid, commentUuid, comment, type, created, author, postUuid, channelTextId, highlight } = props;
  const [dismiss, { isError, isLoading, reset }] = useDismissUserNotificationMutation();
  const { close } = useContext(PopoverContext);

  return (
    <div
      className={classNames(
        "w-full flex flex-col justify-between items-center gap-1",
        "bg-white dark:bg-slate-800",
        "p-3 rounded-md",
        "border border-slate-200 dark:border-slate-700"
      )}
    >
      <div className="flex flex-row justify-between items-start gap-2 w-full">
        <div className="text-sm">
          <span className="font-bold mr-1">{author}</span>
          {type === "POST" && <span>has commented under your post 📬</span>}
          {type === "COMMENT" && <span>has replied to your comment 💬</span>}
        </div>
        <div className="text-secondary dark:text-slate-400 text-sm whitespace-nowrap">
          {timeAgo.format(new Date(created))}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center gap-20 w-full">
        <Link
          to={`/channels/${channelTextId}/post/${postUuid}/comment/${commentUuid}/${highlight}`}
          className={classNames(
            "text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400",
            "hover:underline",
            "text-sm md:text-base truncate"
          )}
          onClick={() => {
            dismiss({ dismissNotificationRequestDto: { notificationUuid } });
            close();
          }}
        >
          {comment}
        </Link>
        <IconButton
          loading={isLoading}
          onClick={() => dismiss({ dismissNotificationRequestDto: { notificationUuid } })}
          className="p-1"
        >
          <XMarkIcon className="h-5 w-5" />
        </IconButton>
      </div>
      <Alert show={isError} fullWidth onClose={() => reset()}>
        Error dismissing a notification.
      </Alert>
    </div>
  );
}
