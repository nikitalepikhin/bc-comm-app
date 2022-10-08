import { useParams } from "react-router-dom";
import Button from "../../common/ui/Button";
import React, { useEffect, useRef, useState } from "react";
import StyledLink from "../../common/ui/StyledLink";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetPostsForChannelApiArg } from "../../app/api";
import ChannelPostsSection from "../channels/ChannelPostsSection";
import { useInView } from "react-intersection-observer";
import { resetPostsLoadTime } from "./postsSlice";

export default function ChannelPosts() {
  const { textId } = useParams() as { textId: string };
  const { role } = useAppSelector((state) => state.auth.user);
  const [order, setOrder] = useState<GetPostsForChannelApiArg["order"]>("new");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const pages = Array.from(Array(page + 1).keys()).slice(1);
  const dispatch = useAppDispatch();

  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (inView) {
      setPage(page + 1);
      setHasMore(false);
    }
  }, [inView]);

  useEffect(() => {
    dispatch(resetPostsLoadTime());
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-full gap-2">
      <div className="flex flex-row gap-2 w-full justify-between items-center">
        <div className="flex flex-row gap-2">
          <Button
            type="button"
            variant={order === "new" ? "outlined" : "standard"}
            onClick={() => {
              setOrder("new");
              setPage(1);
              setHasMore(false);
            }}
          >
            New
          </Button>
          <Button
            type="button"
            variant={order === "top" ? "outlined" : "standard"}
            onClick={() => {
              setOrder("top");
              setPage(1);
              setHasMore(false);
            }}
          >
            Top
          </Button>
        </div>
        {role && ["STUDENT", "TEACHER"].includes(role) && (
          <div className="flex flex-row gap-2">
            <StyledLink to={`/channels/${textId}/post/new`}>Create Post</StyledLink>
          </div>
        )}
      </div>
      {pages.map((page, index) => (
        <ChannelPostsSection
          ref={ref}
          key={page}
          page={page}
          isLastPage={index === pages.length - 1}
          order={order}
          hasMore={hasMore}
          setHasMore={setHasMore}
        />
      ))}
    </div>
  );
}
