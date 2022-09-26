import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useVoteOnPostMutation } from "../../app/enhancedApi";

interface Props {
  uuid: string;
  vote: number;
  up: number;
  down: number;
}

export default function PostVotes(props: Props) {
  const { uuid, vote, up, down } = props;
  const [voteOnPost] = useVoteOnPostMutation();

  return (
    <div className="flex flex-col justify-start items-center gap-2">
      <button
        onClick={() =>
          voteOnPost({
            voteOnPostRequestDto: {
              postUuid: uuid,
              dir: vote === 1 ? 0 : 1,
            },
          })
        }
      >
        <ArrowUpIcon className={classNames("h-5 w-5", { "text-accent": vote === 1 })} />
      </button>
      <span>{up - down}</span>
      <button
        onClick={() =>
          voteOnPost({
            voteOnPostRequestDto: {
              postUuid: uuid,
              dir: vote === -1 ? 0 : -1,
            },
          })
        }
      >
        <ArrowDownIcon className={classNames("h-5 w-5", { "text-accent": vote === -1 })} />
      </button>
    </div>
  );
}
