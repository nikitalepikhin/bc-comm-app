import { format } from "date-fns";
import StyledLink from "../../../common/uilib/StyledLink";
import { Outlet, useParams } from "react-router-dom";
import React from "react";
import { GetChannelByTextIdApiResponse } from "../../../app/api";
import { AcademicCapIcon, CakeIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Box from "../../../common/uilib/Box";
import AboutChannel from "./AboutChannel";

interface Props {
  description: GetChannelByTextIdApiResponse["description"];
  memberCount: GetChannelByTextIdApiResponse["memberCount"];
  created: GetChannelByTextIdApiResponse["created"];
  isOwner: GetChannelByTextIdApiResponse["isOwner"];
}

export default function ChannelInfo(props: Props) {
  const { description, memberCount, created, isOwner } = props;

  return (
    <div className="flex flex-col justify-start items-center gap-2 w-full lg:max-w-sm">
      <AboutChannel description={description} memberCount={memberCount} created={created} isOwner={isOwner} />
    </div>
  );
}
