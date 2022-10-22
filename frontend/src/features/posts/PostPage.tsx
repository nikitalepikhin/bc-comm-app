import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetPostByUuidQuery } from "../../app/enhancedApi";
import LoadingSpinner from "../../common/uilib/LoadingSpinner";
import { XMarkIcon } from "@heroicons/react/20/solid";
import ErrorPage from "../../common/components/ErrorPage";
import Post from "./post/Post";
import Button from "../../common/uilib/Button";

export default function PostPage() {
  const { textId, postUuid } = useParams() as { textId: string; postUuid: string };
  const { data, isLoading, isError, error } = useGetPostByUuidQuery({ postUuid });
  const navigate = useNavigate();

  if (isError && error !== undefined && "status" in error) {
    return <ErrorPage message="This post does not exist." />;
  }

  return (
    <div className="flex flex-col w-full justify-start items-stretch gap-2">
      <div className="w-full flex justify-end items-center">
        <Button
          onClick={() => navigate(`/channels/${textId}`)}
          icon={<XMarkIcon className="h-5 w-5" />}
          className="w-full"
        >
          Close
        </Button>
      </div>
      {isLoading && <LoadingSpinner />}
      {data && data.post && <Post {...data.post} showExpanded />}
      <Outlet />
    </div>
  );
}
