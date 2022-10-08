import { Outlet, useParams } from "react-router-dom";
import Post from "./Post";
import { useGetPostByUuidQuery } from "../../app/enhancedApi";
import LoadingSpinner from "../../common/ui/LoadingSpinner";
import LinkWithIcon from "../../common/ui/LinkWithIcon";
import { XMarkIcon } from "@heroicons/react/20/solid";
import ErrorPage from "../../common/components/ErrorPage";

export default function PostPage() {
  const { textId, postUuid } = useParams() as { textId: string; postUuid: string };
  const { data, isLoading, isError, error } = useGetPostByUuidQuery({ postUuid });

  if (isError && error !== undefined && "status" in error) {
    return <ErrorPage message="This post does not exist." />;
  }

  return (
    <div className="flex flex-col w-full justify-start items-stretch gap-2">
      <div className="w-full flex justify-end items-center">
        <LinkWithIcon to={`/channels/${textId}`} svg={<XMarkIcon className="h-5 w-5" />} icon="right">
          Close
        </LinkWithIcon>
      </div>
      {isLoading && <LoadingSpinner size="h-8 w-8" />}
      {data && data.post && <Post {...data.post} isFull />}
      <Outlet />
    </div>
  );
}
