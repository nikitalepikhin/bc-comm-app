import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import Button from "../../uilib/Button";
import React from "react";
import { useToggleMembershipMutation } from "../../../app/enhancedApi";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/redux/hooks";
import { GetChannelByTextIdApiResponse } from "../../../app/api";

interface Props {
  name: GetChannelByTextIdApiResponse["name"];
  uuid: GetChannelByTextIdApiResponse["uuid"];
  isMember: GetChannelByTextIdApiResponse["isMember"];
}

export default function ChannelHeader(props: Props) {
  const { name, uuid, isMember } = props;
  const { textId } = useParams() as { textId: string };
  const { role, verified } = useAppSelector((state) => state.auth.user);
  const [toggleMembership] = useToggleMembershipMutation();

  return (
    <div className="w-full flex flex-row justify-between items-center flex-wrap gap-2">
      <div>
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="font-bold text-xl">{name}</div>
          <Button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            type="button"
            icon={<ArrowUpOnSquareIcon className="h-4 w-4" />}
            className="px-2 py-1"
          >
            Share
          </Button>
        </div>
        <div className="text-secondary dark:text-slate-400">{`Channel ID: ${textId}`}</div>
      </div>
      {(role === "STUDENT" || role === "TEACHER") && (
        <div className="flex gap-2">
          <Button
            variant="accent"
            disabled={!verified}
            onClick={() => {
              if (uuid) {
                toggleMembership({
                  toggleChannelMembershipRequestDto: {
                    channelUuid: uuid,
                    joining: !isMember,
                  },
                });
              }
            }}
          >
            {isMember ? "Leave" : "Join"}
          </Button>
        </div>
      )}
    </div>
  );
}
