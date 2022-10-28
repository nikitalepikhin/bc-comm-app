import { ForwardedRef, forwardRef, useEffect } from "react";
import { useGetUserFeedQuery } from "../../app/enhancedApi";
import { useAppSelector } from "../../app/redux/hooks";
import LoadingSpinner from "../uilib/LoadingSpinner";
import Post from "../posts/post/Post";
import Alert from "../uilib/Alert";

interface Props {
  page: number;
  isLastPage: boolean;
  hasMore: boolean;
  setHasMore: (value: boolean) => void;
  setHasNew: (value: boolean) => void;
}

function FeedSection(props: Props, ref: ForwardedRef<HTMLDivElement>) {
  const { page, isLastPage, hasMore, setHasMore, setHasNew } = props;
  const { feedLoadTime } = useAppSelector((state) => state.feed);
  const { data, isLoading } = useGetUserFeedQuery({ page, after: feedLoadTime });

  useEffect(() => {
    if (isLastPage && data && data.hasMore) {
      setHasMore(data.hasMore);
    }
    if (isLastPage && data && data.hasNew) {
      setHasNew(data.hasNew);
    }
  }, [isLastPage, data, setHasMore, setHasNew]);

  return (
    <>
      {isLoading && <LoadingSpinner size="h-5 w-5" border="border-2" />}
      {data?.posts.map((post, index) => (
        <div
          className="w-full"
          key={index}
          ref={isLastPage && index === data?.posts.length - 1 && hasMore ? ref : undefined}
        >
          <Post {...post} />
        </div>
      ))}
      {!isLoading && isLastPage && page === 1 && data && data.posts.length === 0 && (
        <div className="w-full text-center p-2">
          Your feed is currently empty
          <br />
          Join some channels to get started 👋
        </div>
      )}
      {!isLoading && isLastPage && data && data.posts.length > 0 && (
        <div className="w-full text-center p-2">
          You have reached the end of the feed
          <br />
          Good job 👍
        </div>
      )}
    </>
  );
}

export default forwardRef(FeedSection);
