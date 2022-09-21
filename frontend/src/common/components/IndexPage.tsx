import React from "react";
import useUserData from "../../features/auth/useUserData";
import VerificationRequestsPage from "../../features/representatives-verification/VerificationRequestsPage";
import StyledLink from "../ui/StyledLink";

export const IndexPage: React.FC = () => {
  const { present, role } = useUserData();

  if (present && (role === "ADMIN" || role === "REPRESENTATIVE")) {
    return <VerificationRequestsPage />;
  } else if (present && role === "TEACHER") {
    return <div>teacher page</div>;
  } else if (present && role === "STUDENT") {
    return <div>student page</div>;
  } else {
    return (
      <div className="m-2">
        <p className="inline">
          {"Welcome, please "}
          <StyledLink to="/login">log in</StyledLink>
          {", or "}
          <StyledLink to="/signup">sign up</StyledLink>.
        </p>
      </div>
    );
  }
};
