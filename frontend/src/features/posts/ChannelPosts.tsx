import { useGetPostsForChannelQuery } from "../../app/enhancedApi";
import { useParams } from "react-router-dom";
import Button from "../../common/ui/Button";
import React, { useEffect, useRef, useState } from "react";
import StyledLink from "../../common/ui/StyledLink";
import LoadingSpinner from "../../common/ui/LoadingSpinner";
import { useAppSelector } from "../../app/hooks";
import classNames from "classnames";
import Post from "./Post";
import { GetPostsForChannelApiArg } from "../../app/api";

export default function ChannelPosts() {
  const { textId } = useParams() as { textId: string };
  const { role } = useAppSelector((state) => state.auth.user);
  const [order, setOrder] = useState<GetPostsForChannelApiArg["order"]>("new");
  const [page, setPage] = useState(1);
  const {
    data: currentData,
    refetch: refetchCurrent,
    isLoading: currentIsLoading,
  } = useGetPostsForChannelQuery({
    channelTextId: textId,
    order,
    page,
  });

  useEffect(() => {
    refetchCurrent();
  }, [order]);

  const ref = useRef(null);

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
      {currentIsLoading && (
        <div className="mt-6 flex flex-col justify-center items-center">
          <LoadingSpinner size="h-10 w-10">Loading posts...</LoadingSpinner>
        </div>
      )}
      {currentData?.posts.length === 0 && <div className="py-4 text-center">It's quite here 🥱</div>}
      <div ref={ref} className="w-full flex justify-center items-center gap-2">
        {page > 1 && (
          <>
            <Button type="button" onClick={() => setPage(page > 1 ? page - 1 : page)}>
              Load previous
            </Button>
            <Button type="button" onClick={() => setPage(1)}>
              Go to the beginning
            </Button>
          </>
        )}
      </div>
      {currentData?.posts.map((post, index) => (
        <div className={classNames("w-full")} key={index}>
          <Post {...post} page={page} order={order} />
        </div>
      ))}
      <div className="w-full flex justify-center items-center">
        {currentData?.hasMore ? (
          <Button
            type="button"
            onClick={() => {
              setPage(page + 1);
              if (ref.current) {
                (ref.current as HTMLDivElement).scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Load more
          </Button>
        ) : (
          <div className="px-4 py-2 bg-gray rounded-md">You are all caught up 👏</div>
        )}
      </div>
    </div>
  );
}
