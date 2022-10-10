import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useGetChannelByTextIdQuery, useToggleMembershipMutation } from "../../app/enhancedApi";
import { format } from "date-fns";
import Button from "../../common/uilib/Button";
import { ShareIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../app/hooks";
import StyledLink from "../../common/uilib/StyledLink";
import LoadingSpinner from "../../common/uilib/LoadingSpinner";
import ErrorPage from "../../common/components/ErrorPage";
import PageWrapper from "../../common/uilib/PageWrapper";

const ChannelPage: React.FC = () => {
  const { textId } = useParams() as { textId: string };
  const { role } = useAppSelector((state) => state.auth.user);
  const { data, isLoading, isError, error } = useGetChannelByTextIdQuery({ textId: textId! });
  const [toggleMembership] = useToggleMembershipMutation();

  if (isError && error !== undefined && "status" in error) {
    return <ErrorPage code={String(error.status)} message="This channel does not exist." />;
  }

  return isLoading ? (
    <div>
      <LoadingSpinner size="h-8 w-8" />
    </div>
  ) : (
    <PageWrapper>
      <div className="flex flex-col justify-start items-center gap-2">
        <div className="w-full flex flex-row justify-between items-center flex-wrap gap-2">
          <div>
            <h1 className="font-bold text-2xl">{data?.name}</h1>
            <div className="flex flex-row items-center gap-2">
              <p className="text-sm text-secondary">{textId}</p>
              <button type="button" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <ShareIcon className="h-4 w-4" />
              </button>
            </div>
            {data?.owner.role && (
              <div className="text-sm text-secondary">
                Created and managed by{" "}
                {data?.owner.role === "STUDENT"
                  ? "a student"
                  : `${data?.owner.username} (${
                      data?.owner.role[0].toUpperCase() + data?.owner.role.slice(1).toLowerCase()
                    })`}
              </div>
            )}
          </div>
          {(role === "STUDENT" || role === "TEACHER") && (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (data?.uuid) {
                    toggleMembership({
                      toggleChannelMembershipRequestDto: {
                        channelUuid: data?.uuid,
                        joining: !data?.isMember,
                      },
                    });
                  }
                }}
              >
                {data?.isMember ? "Leave" : "Join"}
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-start items-stretch lg:flex-row-reverse lg:justify-between gap-2 w-full">
          <div className="flex flex-col justify-start items-center gap-2 w-full lg:max-w-sm">
            <div className="flex flex-col justify-between items-start bg-white rounded-md shadow px-6 py-3 w-full">
              <h2 className="font-bold text-lg">About This Channel</h2>
              <div>{data?.description}</div>
              <div className="flex flex-row justify-around items-center flex-wrap gap-2 w-full">
                <div className="flex flex-col justify-start items-center flex-wrap">
                  <div className="font-bold">Member count</div>
                  <div>{data?.memberCount} 🧑‍🎓</div>
                </div>
                <div className="flex flex-col justify-start items-center flex-wrap">
                  <div className="font-bold">Date created</div>
                  <div>{data?.created ? format(new Date(data?.created), "dd.MM.yyyy") : "??.??.????"} 🎂</div>
                </div>
              </div>
            </div>
            {data?.isOwner && (
              <div className="bg-white rounded-md shadow px-6 py-3 w-full">
                <h2 className="font-bold text-lg">Channel Management</h2>
                <StyledLink to={`/channels/${textId}/edit`}>Manage channel</StyledLink>
              </div>
            )}
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ChannelPage;
