import { CakeIcon, Cog6ToothIcon, IdentificationIcon, UsersIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import React from "react";
import { GetChannelByTextIdApiResponse } from "../../../app/api";
import Container from "../../uilib/Container";
import { enIN } from "date-fns/locale";
import Button from "../../uilib/Button";
import StyledLink from "../../uilib/StyledLink";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/redux/hooks";

interface Props {
  description: GetChannelByTextIdApiResponse["description"];
  memberCount: GetChannelByTextIdApiResponse["memberCount"];
  created: GetChannelByTextIdApiResponse["created"];
  isOwner: GetChannelByTextIdApiResponse["isOwner"];
  owner: GetChannelByTextIdApiResponse["owner"];
}

export default function AboutChannel(props: Props) {
  const { description, memberCount, created, isOwner, owner } = props;
  const { textId } = useParams() as { textId: string };
  const { role } = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <Container title="About This Channel" className="w-full">
      <div className="flex flex-col justify-start gap-3 divide-y divide-slate-200 dark:divide-slate-700">
        <div className="flex flex-col justify-start gap-2">
          <div className="text-secondary dark:text-slate-400">{description}</div>
          <div className="flex flex-row justify-start items-center gap-2">
            <div>
              <CakeIcon className="h-6 w-6" />
            </div>
            <span>{`Created on ${format(new Date(created), "MMM d, yyyy", { locale: enIN })}`}</span>
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-2 pt-3">
          <div>
            <UsersIcon className="h-6 w-6" />
          </div>
          <span>{`Members: ${memberCount}`}</span>
        </div>
        <div className="flex flex-row justify-start items-center gap-2 pt-3 w-full">
          <div>
            <IdentificationIcon className="h-6 w-6" />
          </div>
          {owner.role.toLowerCase() === "student" && <span className="grow">Owner: student</span>}
          {owner.role.toLowerCase() === "teacher" && (
            <span className="grow break-words shrink">{`Owner: teacher ${owner.name ?? ""} (${owner.username})`}</span>
          )}
        </div>
        {isOwner && (
          <div className="flex flex-row justify-start items-center gap-2 pt-3">
            <div>
              <Cog6ToothIcon className="h-6 w-6" />
            </div>
            <StyledLink to={`/channels/${textId}/edit`}>Manage your channel</StyledLink>
          </div>
        )}
        {(role === "TEACHER" || role === "STUDENT") && (
          <div className="pt-3">
            <Button
              type="button"
              variant="accent"
              onClick={() => navigate(`/channels/${textId}/post/new`)}
              className="w-full"
            >
              Create Post
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}
