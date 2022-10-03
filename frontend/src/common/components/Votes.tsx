import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useVoteOnPostMutation } from "../../app/enhancedApi";
import { useVoteOnCommentMutation } from "../../app/api";
import { useCallback } from "react";

interface Props {
  mode: "post" | "comment";
  uuid: string;
  currentVote: number;
  up: number;
  down: number;
}

export default function Votes(props: Props) {
  const { mode, uuid, currentVote, up, down } = props;
  const [voteOnPost] = useVoteOnPostMutation();
  const [voteOnComment] = useVoteOnCommentMutation();

  const sendVote = useCallback(
    (dir: number) => {
      if (mode === "post") {
        voteOnPost({ voteOnPostRequestDto: { uuid, dir } });
      } else if (mode === "comment") {
        voteOnComment({ voteOnCommentRequestDto: { uuid, dir } });
      }
    },
    [uuid, mode]
  );

  return (
    <div
      className={classNames(
        "flex items-center",
        { "flex-row justify-between gap-1": mode === "comment" },
        { "flex-col justify-start gap-2": mode === "post" }
      )}
    >
      <button onClick={() => sendVote(currentVote === 1 ? 0 : 1)}>
        <ArrowUpIcon className={classNames("h-5 w-5", { "text-accent": currentVote === 1 })} />
      </button>
      <span>{up - down}</span>
      <button onClick={() => sendVote(currentVote === -1 ? 0 : -1)}>
        <ArrowDownIcon className={classNames("h-5 w-5", { "text-accent": currentVote === -1 })} />
      </button>
    </div>
  );
}
