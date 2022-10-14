import { EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useContext } from "react";
import PostContext from "./post/PostContext";
import { useParams } from "react-router-dom";
import Dropdown from "../../common/uilib/dropdown/Dropdown";

export default function PostContextMenu() {
  const { textId } = useParams();
  const { isAuthor, uuid, onDelete } = useContext(PostContext);

  return (
    <Dropdown
      open="left"
      gap="top-7"
      items={[
        {
          type: "link",
          to: `/channels/${textId}/post/${uuid}/edit`,
          name: "Edit",
          icon: <PencilSquareIcon className="h-4 w-4" />,
          show: isAuthor,
        },
        {
          type: "button",
          onClick: onDelete,
          name: "Delete",
          danger: true,
          icon: <TrashIcon className="h-4 w-4" />,
          show: isAuthor,
        },
      ]}
      className={classNames(
        "text-sm text-center text-primary dark:text-white",
        "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800",
        "border border-slate-200 dark:border-slate-700",
        "rounded-md py-0.5 px-2",
        "focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
        "flex justify-center items-center gap-1.5",
        "disabled:text-slate-400 disabled:hover:bg-white disabled:dark:text-slate-500 disabled:hover:dark:bg-slate-900"
      )}
    >
      <EllipsisHorizontalIcon className="h-5 w-5" />
    </Dropdown>
  );
}
