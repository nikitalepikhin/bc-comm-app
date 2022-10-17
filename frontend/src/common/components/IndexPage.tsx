import React from "react";
import useUserData from "../../features/auth/useUserData";
import RequestsPage from "../../features/requests/RequestsPage";
import StyledLink from "../uilib/StyledLink";
import FeedPage from "../../features/feed/FeedPage";
import AuthPage from "../../features/auth/AuthPage";

export const IndexPage: React.FC = () => {
  const { present, role } = useUserData();

  if (present && (role === "ADMIN" || role === "REPRESENTATIVE")) {
    return <RequestsPage />;
  } else if (present && (role === "TEACHER" || role === "STUDENT")) {
    return <FeedPage />;
  } else {
    return <AuthPage />;
  }
};
