import { useGetPostsForChannelQuery } from "../../app/enhancedApi";
import { useParams } from "react-router-dom";
import Post from "./Post";
import Button from "../../common/ui/Button";
import React, {useEffect, useMemo, useState} from "react";
import StyledLink from "../../common/ui/StyledLink";
import LoadingSpinner from "../../common/ui/LoadingSpinner";
import { useAppSelector } from "../../app/hooks";
import { useInView } from "react-intersection-observer";

export default function ChannelPosts() {
  const { textId } = useParams() as { textId: string };
  const { role } = useAppSelector((state) => state.auth.user);
  const [order, setOrder] = useState<"top" | "new">("new");
  const [page, setPage] = useState(1);
  const {
    data: lastData,
    refetch: refetchLast,
    isLoading: lastIsLoading,
  } = useGetPostsForChannelQuery({ channelTextId: textId, order, page: page - 1 }, { skip: page === 1 });
  const {
    data: currentData,
    refetch: refetchCurrent,
    isLoading: currentIsLoading,
  } = useGetPostsForChannelQuery({
    channelTextId: textId,
    order,
    page,
  });
  const {
    data: nextData,
    refetch: refetchNext,
    isLoading: nextIsLoading,
  } = useGetPostsForChannelQuery({
    channelTextId: textId,
    order,
    page: page + 1,
  });

  const combinedData = useMemo(() => {
    const arr = new Array(10 * (page + 1));
    for (const data of [lastData, currentData, nextData]) {

    }
  }, [])

  const { inView, ref } = useInView();

  useEffect(() => {
    refetchLast();
    refetchCurrent();
    refetchNext();
  }, [order]);

  return (
    <div className="flex flex-col justify-start items-center w-full gap-2">
      <div className="flex flex-row gap-2 w-full justify-between items-center">
        <div className="flex flex-row gap-2">
          <Button type="button" variant="contained" onClick={() => setOrder("new")}>
            New
          </Button>
          <Button type="button" variant="contained" onClick={() => setOrder("top")}>
            Top
          </Button>
        </div>
        {role && ["STUDENT", "TEACHER"].includes(role) && (
          <div className="flex flex-row gap-2">
            <StyledLink to={`/channels/${textId}/post/new`}>Create Post</StyledLink>
          </div>
        )}
      </div>
      {(lastIsLoading || currentIsLoading || nextIsLoading) && (
        <div className="mt-6 flex flex-col justify-center items-center">
          <LoadingSpinner size="h-10 w-10">Loading posts...</LoadingSpinner>
        </div>
      )}
      {data?.posts.length === 0 && <div className="py-4 text-center">It's quite here 🥱.</div>}
      {data?.posts.map((post) => (
        <Post key={post.uuid} {...post} />
      ))}
    </div>
  );
}
