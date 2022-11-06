import { Outlet, useParams } from "react-router-dom";
import { useGetChannelByTextIdQuery } from "../../../app/enhancedApi";
import ErrorPage from "../../common/ErrorPage";
import LoadingSpinner from "../../uilib/LoadingSpinner";
import PageWrapper from "../../uilib/PageWrapper";
import ChannelHeader from "./ChannelHeader";
import ChannelInfo from "./ChannelInfo";

export default function ChannelPage() {
  const { textId } = useParams() as { textId: string };
  const { data, isLoading, isError, error } = useGetChannelByTextIdQuery({ textId });

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <PageWrapper className="flex flex-col justify-start gap-2">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ChannelHeader name={data?.name!} uuid={data?.uuid!} isMember={data?.isMember!} />
          <div className="w-full flex flex-col lg:flex-row-reverse justify-start gap-2">
            <ChannelInfo
              created={data?.created!}
              description={data?.description!}
              isOwner={data?.isOwner!}
              memberCount={data?.memberCount!}
              owner={data?.owner!}
            />
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </PageWrapper>
  );
}
