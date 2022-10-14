import LinkWithIcon from "../../common/uilib/LinkWithIcon";
import { PencilIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Button from "../../common/uilib/Button";
import { useContext } from "react";
import PostContext from "./post/PostContext";
import { useParams } from "react-router-dom";
import Dropdown from "../../common/uilib/dropdown/Dropdown";

interface Props {}

export default function PostContextMenu(props: Props) {
  const { textId } = useParams();
  const { isAuthor, uuid, onDelete } = useContext(PostContext);

  return (
    <Dropdown
      open="left"
      gap="top-6"
      textSmall
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
        "rounded-md px-2",
        "focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
        "flex justify-center items-center gap-1.5",
        "disabled:text-slate-400 disabled:hover:bg-white disabled:dark:text-slate-500 disabled:hover:dark:bg-slate-900"
      )}
    >
      Options
    </Dropdown>
  );

  // return (
  //   <>
  //     {isAuthor && (
  //       <>
  //         <input type="checkbox" id={`post-context-${uuid}`} className="peer hidden" />
  //         <label
  //           htmlFor={`post-context-${uuid}`}
  //           className="block peer-checked:hidden lg:hidden lg:peer-checked:hidden self-start lg:self-auto"
  //         >
  //           <ChevronDownIcon className="h-5 w-5" />
  //         </label>
  //         <label
  //           htmlFor={`post-context-${uuid}`}
  //           className="hidden peer-checked:block lg:hidden lg:peer-checked:hidden self-start lg:self-auto"
  //         >
  //           <ChevronUpIcon className="h-5 w-5" />
  //         </label>
  //       </>
  //     )}
  //     <div
  //       className={classNames(
  //         "flex-col lg:flex-row justify-end items-center gap-2 flex-wrap peer-checked:flex hidden lg:flex absolute top-6 -right-2 lg:static bg-white rounded-md lg:bg-transparent lg:rounded-none shadow lg:shadow-none px-3 py-1 lg:p-0"
  //       )}
  //     >
  //       {isAuthor && showExpanded && (
  //         <Button
  //           type="button"
  //           onClick={() => deletePost({ deletePostRequestDto: { postUuid: uuid } })}
  //           variant="standard"
  //           textSize="base"
  //           icon={<TrashIcon className="h-4 w-4" />}
  //         >
  //           Delete
  //         </Button>
  //       )}
  //       {isAuthor && (
  //         <LinkWithIcon
  //           to={`/channels/${textId}/post/${uuid}/edit`}
  //           icon={<PencilIcon className="h-4 w-4" />}
  //           position="right"
  //         >
  //           Edit
  //         </LinkWithIcon>
  //       )}
  //     </div>
  //   </>
  // );
}
