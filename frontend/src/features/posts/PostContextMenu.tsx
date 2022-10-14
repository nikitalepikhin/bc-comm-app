import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from "@heroicons/react/20/solid";
import LinkWithIcon from "../../common/uilib/LinkWithIcon";
import { PencilIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Button from "../../common/uilib/Button";

interface Props {
  onDelete: () => void;
  isAuthor: boolean;
  uuid: string;
  isFull: boolean;
  textId: string;
}

export default function PostContextMenu(props: Props) {
  const { isAuthor, uuid, isFull, textId, onDelete } = props;
  return (
    <>
      {isAuthor && (
        <>
          <input type="checkbox" id={`post-context-${uuid}`} className="peer hidden" />
          <label
            htmlFor={`post-context-${uuid}`}
            className="block peer-checked:hidden lg:hidden lg:peer-checked:hidden self-start lg:self-auto"
          >
            <ChevronDownIcon className="h-5 w-5" />
          </label>
          <label
            htmlFor={`post-context-${uuid}`}
            className="hidden peer-checked:block lg:hidden lg:peer-checked:hidden self-start lg:self-auto"
          >
            <ChevronUpIcon className="h-5 w-5" />
          </label>
        </>
      )}
      <div
        className={classNames(
          "flex-col lg:flex-row justify-end items-center gap-2 flex-wrap peer-checked:flex hidden lg:flex absolute top-6 -right-2 lg:static bg-white rounded-md lg:bg-transparent lg:rounded-none shadow lg:shadow-none px-3 py-1 lg:p-0"
        )}
      >
        {isAuthor && isFull && (
          <Button
            type="button"
            onClick={onDelete}
            variant="standard"
            textSize="base"
            icon={<TrashIcon className="h-4 w-4" />}
          >
            Delete
          </Button>
        )}
        {isAuthor && (
          <LinkWithIcon
            to={`/channels/${textId}/post/${uuid}/edit`}
            icon={<PencilIcon className="h-4 w-4" />}
            position="right"
          >
            Edit
          </LinkWithIcon>
        )}
      </div>
    </>
  );
}
