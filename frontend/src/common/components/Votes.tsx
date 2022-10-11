import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useVoteOnPostMutation } from "../../app/enhancedApi";
import { useVoteOnCommentMutation } from "../../app/api";
import { useCallback } from "react";
import IconButton from "../uilib/IconButton";

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
        "flex items-center gap-2",
        { "flex-row justify-between": mode === "comment" },
        { "flex-col justify-start": mode === "post" }
      )}
    >
      <IconButton
        onClick={() => sendVote(currentVote === 1 ? 0 : 1)}
        className={classNames(
          "rounded-md p-1",
          { "bg-slate-100/70": currentVote !== 1 },
          { "bg-blue-300/40": currentVote === 1 }
        )}
      >
        <ArrowUpIcon className={classNames("h-5 w-5 font-extrabold", { "text-blue-600": currentVote === 1 })} />
      </IconButton>
      <span>{up - down}</span>
      <IconButton
        onClick={() => sendVote(currentVote === -1 ? 0 : -1)}
        className={classNames(
          "rounded-md p-1",
          { "bg-slate-100/70": currentVote !== -1 },
          { "bg-blue-300/40": currentVote === -1 }
        )}
      >
        <ArrowDownIcon className={classNames("h-5 w-5 font-extrabold", { "text-blue-600": currentVote === -1 })} />
      </IconButton>
    </div>
  );
}
