import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import DeletePostButton from "./DeletePostButton";
import LinkWithIcon from "../../common/ui/LinkWithIcon";
import { PencilIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

interface Props {
  isAuthor: boolean;
  uuid: string;
  isFull: boolean;
  textId: string;
}

export default function PostContextMenu(props: Props) {
  const { isAuthor, uuid, isFull, textId } = props;
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
        {isAuthor && isFull && <DeletePostButton />}
        {isAuthor && (
          <LinkWithIcon to={`/channels/${textId}/post/${uuid}/edit`} svg={<PencilIcon className="h-4 w-4" />}>
            Edit
          </LinkWithIcon>
        )}
      </div>
    </>
  );
}
