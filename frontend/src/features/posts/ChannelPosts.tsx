import { useGetPostsForChannelQuery } from "../../app/enhancedApi";
import { useParams } from "react-router-dom";
import ChannelPost from "./ChannelPost";
import Button from "../../common/ui/Button";
import React from "react";
import StyledLink from "../../common/ui/StyledLink";
import LoadingSpinner from "../../common/ui/LoadingSpinner";

export default function ChannelPosts() {
  const { textId } = useParams() as { textId: string };
  const { data, isLoading } = useGetPostsForChannelQuery({ channelTextId: textId });

  return (
    <div className="flex flex-col justify-start items-center w-full gap-2">
      <div className="flex flex-row gap-2 w-full justify-between items-center">
        <div className="flex flex-row gap-2">
          <Button type="button" variant="contained">
            Top
          </Button>
          <Button type="button" variant="contained">
            New
          </Button>
        </div>
        <div className="flex flex-row gap-2">
          <StyledLink to={`/channels/${textId}/post/new`}>Create Post</StyledLink>
        </div>
      </div>
      {isLoading && (
        <div className="mt-6 flex flex-col justify-center items-center">
          <LoadingSpinner size="h-10 w-10">Loading posts...</LoadingSpinner>
        </div>
      )}
      {data?.posts.map((post) => (
        <ChannelPost key={post.uuid} {...post} />
      ))}
    </div>
  );
}
