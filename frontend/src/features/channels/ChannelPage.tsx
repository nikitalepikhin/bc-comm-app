import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetChannelByTextIdQuery,
  useGetPostsForChannelQuery,
  useToggleMembershipMutation,
} from "../../app/enhancedApi";
import { format } from "date-fns";
import Button from "../../common/ui/Button";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../app/hooks";
import StyledLink from "../../common/ui/StyledLink";
import ChannelPosts from "../posts/ChannelPosts";

const ChannelPage: React.FC = () => {
  const { textId } = useParams() as { textId: string };
  const { role } = useAppSelector((state) => state.auth.user);
  const { data, isFetching } = useGetChannelByTextIdQuery({ textId: textId! });
  const [toggleMembership, { isLoading }] = useToggleMembershipMutation();
  const { data: posts } = useGetPostsForChannelQuery({ channelTextId: textId });

  return (
    <div className="flex flex-col justify-start items-center gap-2">
      <div className="w-full flex flex-row justify-between items-center flex-wrap gap-2">
        <div>
          <h1 className="font-bold text-2xl">{data?.name}</h1>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-secondary">{textId}</p>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <ClipboardDocumentListIcon className="h-6 w-6" />
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
        <div className="flex gap-2">
          <Button
            variant="contained"
            disabled={role !== "STUDENT" && role !== "TEACHER"}
            onClick={() => {
              if (data?.uuid) {
                toggleMembership({
                  toggleChannelMembershipRequestDto: {
                    channelUuid: data?.uuid,
                    channelTextId: data?.textId,
                    joining: !data?.isMember,
                  },
                });
              }
            }}
          >
            {data?.isMember ? "Leave" : "Join"}
          </Button>
        </div>
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
          <ChannelPosts />
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
