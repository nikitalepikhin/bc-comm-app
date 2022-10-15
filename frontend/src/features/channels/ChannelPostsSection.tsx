import classNames from "classnames";
import React, { ForwardedRef, forwardRef, useEffect } from "react";
import { GetPostCommentsApiArg } from "../../app/api";
import { useGetPostsForChannelQuery } from "../../app/enhancedApi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../common/uilib/LoadingSpinner";
import { useAppSelector } from "../../app/hooks";
import Post from "../posts/post/Post";
import Box from "../../common/uilib/Box";

interface Props {
  page: number;
  isLastPage: boolean;
  order: GetPostCommentsApiArg["order"];
  hasMore: boolean;
  setHasMore: (value: boolean) => void;
}

function ChannelPostsSection(props: Props, ref: ForwardedRef<HTMLDivElement>) {
  const { page, isLastPage, order, hasMore, setHasMore } = props;
  const { textId } = useParams() as { textId: string };
  const { postsLoadTime } = useAppSelector((state) => state.posts);

  const { data, refetch, isLoading, isError, error } = useGetPostsForChannelQuery({
    channelTextId: textId,
    order,
    page,
    after: postsLoadTime,
  });

  useEffect(() => {
    if (isLastPage && data && data.hasMore) {
      setHasMore(data.hasMore);
    }
  }, [isLastPage, data, setHasMore]);

  useEffect(() => {
    refetch();
  }, [order]);

  return (
    <>
      {isLoading && <LoadingSpinner size="h-5 w-5" border="border-2" />}
      {data?.posts.map((post, index) => (
        <div
          className={classNames("w-full")}
          key={index}
          ref={isLastPage && index === data?.posts.length - 1 && hasMore ? ref : undefined}
        >
          <Post {...post} />
        </div>
      ))}
      {!isLoading && page === 1 && data && data.posts.length === 0 && (
        <Box className="flex flex-col justify-center items-center text-center w-full py-6">
          It's quite in here... 😴
          <br />
          Be the first create a post.
        </Box>
      )}
    </>
  );
}

export default forwardRef(ChannelPostsSection);
