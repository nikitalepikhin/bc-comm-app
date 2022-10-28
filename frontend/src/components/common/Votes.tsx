import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useVoteOnPostMutation } from "../../app/enhancedApi";
import { useVoteOnCommentMutation } from "../../app/api";
import { useCallback } from "react";
import IconButton from "../uilib/IconButton";
import { useAppSelector } from "../../app/redux/hooks";

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
  const { role } = useAppSelector((state) => state.auth.user);

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
        disabled={role !== "STUDENT" && role !== "TEACHER"}
        onClick={() => sendVote(currentVote === 1 ? 0 : 1)}
        className={classNames(
          "rounded-md p-1",
          { "bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 hover:dark:bg-slate-700": currentVote !== 1 },
          { "bg-blue-100 hover:bg-blue-200 dark:bg-blue-800/50 hover:dark:bg-blue-700/50": currentVote === 1 }
        )}
      >
        <ArrowUpIcon
          className={classNames("h-5 w-5 font-extrabold", {
            "text-blue-600 dark:text-blue-300": currentVote === 1,
          })}
        />
      </IconButton>
      <div>{up - down}</div>
      <IconButton
        disabled={role !== "STUDENT" && role !== "TEACHER"}
        onClick={() => sendVote(currentVote === -1 ? 0 : -1)}
        className={classNames(
          "rounded-md p-1",
          { "bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 hover:dark:bg-slate-700": currentVote !== -1 },
          { "bg-blue-100 hover:bg-blue-200 dark:bg-blue-800/50 hover:dark:bg-blue-700/50": currentVote === -1 }
        )}
      >
        <ArrowDownIcon
          className={classNames("h-5 w-5 font-extrabold", { "text-blue-600 dark:text-blue-300": currentVote === -1 })}
        />
      </IconButton>
    </div>
  );
}
