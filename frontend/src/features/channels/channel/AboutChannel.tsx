import { AcademicCapIcon, CakeIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import React from "react";
import { GetChannelByTextIdApiResponse } from "../../../app/api";
import Container from "../../../common/uilib/Container";
import { enIN } from "date-fns/locale";
import Button from "../../../common/uilib/Button";
import StyledLink from "../../../common/uilib/StyledLink";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  description: GetChannelByTextIdApiResponse["description"];
  memberCount: GetChannelByTextIdApiResponse["memberCount"];
  created: GetChannelByTextIdApiResponse["created"];
  isOwner: GetChannelByTextIdApiResponse["isOwner"];
}

export default function AboutChannel(props: Props) {
  const { description, memberCount, created, isOwner } = props;
  const { textId } = useParams() as { textId: string };
  const navigate = useNavigate();

  return (
    <Container title="About This Channel" className="w-full">
      <div className="flex flex-col justify-start gap-2 divide-y divide-slate-200 dark:divide-slate-700">
        <div className="flex flex-col justify-start gap-2 pb-2">
          <div className="text-secondary dark:text-slate-400">{description}</div>
          <div className="flex flex-row justify-start items-center gap-2">
            <CakeIcon className="h-6 w-6" />
            <span>{`Created on ${format(new Date(created), "MMM d, yyyy", { locale: enIN })}`}</span>
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-2 py-2">
          <AcademicCapIcon className="h-6 w-6" />
          <span>{`Members: ${memberCount}`}</span>
        </div>
        {isOwner && (
          <div className="flex flex-row justify-start items-center gap-2 py-2">
            <Cog6ToothIcon className="h-6 w-6" />
            <StyledLink to={`/channels/${textId}/edit`}>Manage your channel</StyledLink>
          </div>
        )}
        <div className="pt-2">
          <Button
            type="button"
            variant="accent"
            onClick={() => navigate(`/channels/${textId}/post/new`)}
            className="w-full"
          >
            Create Post
          </Button>
        </div>
      </div>
    </Container>
  );
}
