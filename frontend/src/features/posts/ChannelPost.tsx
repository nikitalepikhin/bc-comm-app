import { ChannelPostDto } from "../../app/api";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link, useParams } from "react-router-dom";
import { useVoteOnPostMutation } from "../../app/enhancedApi";
import classNames from "classnames";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export default function ChannelPost(props: ChannelPostDto) {
  const { uuid, title, body, created, author, edited, up, down, vote } = props;
  const { textId } = useParams() as { textId: string };

  const [voteOnPost] = useVoteOnPostMutation();

  return (
    <div className="py-2 px-4 shadow rounded-md w-full flex flex-row justify-between items-start gap-2">
      <div className="flex flex-col justify-start items-center gap-2">
        <button
          onClick={() =>
            voteOnPost({ voteOnPostRequestDto: { postUuid: uuid, dir: vote === 1 ? 0 : 1, channelTextId: textId } })
          }
        >
          <ArrowUpIcon className={classNames("h-5 w-5", { "text-accent": vote === 1 })} />
        </button>
        <span>{up - down}</span>
        <button
          onClick={() =>
            voteOnPost({ voteOnPostRequestDto: { postUuid: uuid, dir: vote === -1 ? 0 : -1, channelTextId: textId } })
          }
        >
          <ArrowDownIcon className={classNames("h-5 w-5", { "text-accent": vote === -1 })} />
        </button>
      </div>
      <div className="flex flex-col justify-start grow">
        <div className="text-sm text-secondary flex flex-row items-center gap-2">
          <div>
            Posted by <span>{author}</span> <span>{timeAgo.format(new Date(created))}</span>
          </div>
          {edited && <div className="uppercase bg-secondary rounded-md px-2 py-0.5 text-white text-xs">Edited</div>}
        </div>
        <Link to={`/channels/${textId}/post/${uuid}`} className="text-lg font-bold hover:text-accent transition-all">
          {title}
        </Link>
        <div className="mt-1 max-h-52 line-clamp-4 w-full">{body}</div>
      </div>
    </div>
  );
}
