import classNames from "classnames";
import Post from "../posts/Post";
import React, { ForwardedRef, forwardRef, useEffect } from "react";
import { GetPostCommentsApiArg } from "../../app/api";
import { useGetPostsForChannelQuery } from "../../app/enhancedApi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../common/ui/LoadingSpinner";

interface Props {
  page: number;
  isLastPage: boolean;
  order: GetPostCommentsApiArg["order"];
  hasMore: boolean;
  setHasMore: (value: boolean) => void;
  initialDatetime: Date; //todo - get from state
}

function ChannelPostsSection(props: Props, ref: ForwardedRef<HTMLDivElement>) {
  const { page, isLastPage, order, hasMore, setHasMore, initialDatetime } = props;
  const { textId } = useParams() as { textId: string };

  const { data, refetch, isLoading } = useGetPostsForChannelQuery({
    channelTextId: textId,
    order,
    page,
    after: initialDatetime.toISOString(),
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
