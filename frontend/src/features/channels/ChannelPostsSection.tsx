import classNames from "classnames";
import Post from "../posts/Post";
import React, { ForwardedRef, forwardRef, useEffect } from "react";
import { GetPostCommentsApiArg } from "../../app/api";
import { useGetPostsForChannelQuery } from "../../app/enhancedApi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../common/ui/LoadingSpinner";
import { useAppSelector } from "../../app/hooks";

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
    </>
  );
}

export default forwardRef(ChannelPostsSection);
