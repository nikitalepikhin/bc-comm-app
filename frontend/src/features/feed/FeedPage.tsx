import { useEffect, useState } from "react";
import FeedSection from "./FeedSection";
import { useInView } from "react-intersection-observer";
import Button from "../../common/uilib/Button";
import { useAppDispatch } from "../../app/hooks";
import { resetFeedLoadTime } from "./feedSlice";
import PageWrapper from "../../common/uilib/PageWrapper";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function FeedPage() {
  const [page, setPage] = useState(1);
  const pages = Array.from(Array(page + 1).keys()).slice(1);
  const [hasMore, setHasMore] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFeedLoadTime());
  }, []);

  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (inView) {
      setPage(page + 1);
      setHasMore(false);
      setHasNew(false);
    }
  }, [inView]);

  return (
    <PageWrapper>
      <div className="mx-auto lg:w-2/3 w-full flex flex-col gap-2 justify-start items-center">
        {hasNew && (
          <Button
            type="button"
            variant="accent"
            className="fixed top-18 z-10"
            onClick={() => {
              dispatch(resetFeedLoadTime());
              setPage(1);
              setHasMore(false);
              setHasNew(false);
              scrollTo({ top: 0, behavior: "smooth" });
            }}
            icon={<ArrowPathIcon className="h-5 w-5" />}
          >
            Load new posts
          </Button>
        )}
        {pages.map((page, index) => (
          <FeedSection
            ref={ref}
            key={page}
            page={page}
            isLastPage={index === pages.length - 1}
            hasMore={hasMore}
            setHasMore={setHasMore}
            setHasNew={setHasNew}
          />
        ))}
      </div>
    </PageWrapper>
  );
}
