import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/redux/hooks";
import Votes from "../../common/Votes";
import Button from "../../uilib/Button";

interface Props {
  uuid: string;
  dir: number;
  up: number;
  down: number;
  isAuthor: boolean;
  postUuid: string;
  setIsEditing: (value: boolean) => void;
  setIsReplying: (value: boolean) => void;
  setIsDeleting: (value: boolean) => void;
}

export const onCommentShare = (textId: string, postUuid: string, uuid: string) =>
  navigator.clipboard.writeText(window.location.origin + `/channels/${textId}/post/${postUuid}/comment/${uuid}`);

export default function CommentFooter(props: Props) {
  const { uuid, postUuid, isAuthor, dir, up, down, setIsEditing, setIsReplying, setIsDeleting } = props;
  const { textId } = useParams() as { textId: string };
  const { verified } = useAppSelector((state) => state.auth.user);

  return (
    <div className="w-full flex flex-row justify-start items-center flex-wrap gap-1">
      <Votes uuid={uuid} currentVote={dir} up={up} down={down} mode="comment" />
      <Button
        type="button"
        disabled={!verified}
        variant="standard"
        onClick={() => setIsReplying(true)}
        className="py-1 px-2 ml-2"
      >
        Reply
      </Button>
      {isAuthor && (
        <Button
          type="button"
          disabled={!verified}
          variant="standard"
          onClick={() => setIsEditing(true)}
          className="py-1 px-2 hidden md:block"
        >
          Edit
        </Button>
      )}
      <Button
        type="button"
        variant="standard"
        onClick={() => onCommentShare(textId, postUuid, uuid)}
        className="py-1 px-2 hidden md:block"
      >
        Share
      </Button>
      {isAuthor && (
        <Button
          type="button"
          disabled={!verified}
          variant="standard"
          onClick={() => setIsDeleting(true)}
          className="py-1 px-2 hidden md:block"
        >
          Delete
        </Button>
      )}
    </div>
  );
}
