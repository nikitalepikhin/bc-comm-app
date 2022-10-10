import React from "react";
import useUserData from "../../features/auth/useUserData";
import VerificationRequestsPage from "../../features/representatives-verification/VerificationRequestsPage";
import StyledLink from "../uilib/StyledLink";
import FeedPage from "../../feed/FeedPage";

export const IndexPage: React.FC = () => {
  const { present, role } = useUserData();

  if (present && (role === "ADMIN" || role === "REPRESENTATIVE")) {
    return <VerificationRequestsPage />;
  } else if (present && (role === "TEACHER" || role === "STUDENT")) {
    return <FeedPage />;
  } else {
    return (
      <div className="my-2">
        <p>
          <StyledLink to="/login">Log in</StyledLink>
        </p>
        <p>
          <StyledLink to="/signup">Sign up</StyledLink>
        </p>
      </div>
    );
  }
};
