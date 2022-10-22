import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useGetChannelByTextIdQuery } from "../../../app/enhancedApi";
import LoadingSpinner from "../../../common/uilib/LoadingSpinner";
import ErrorPage from "../../../common/components/ErrorPage";
import PageWrapper from "../../../common/uilib/PageWrapper";
import ChannelHeader from "./ChannelHeader";
import ChannelInfo from "./ChannelInfo";

const ChannelPage: React.FC = () => {
  const { textId } = useParams() as { textId: string };
  const { data, isLoading, isError, error } = useGetChannelByTextIdQuery({ textId });

  if (isError && error !== undefined && "status" in error) {
    return <ErrorPage code={String(error.status)} message="This channel does not exist." />;
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
};

export default ChannelPage;
