import React from "react";
import useUserData from "../../features/auth/useUserData";
import VerificationRequestsPage from "../../features/representatives-verification/VerificationRequestsPage";
import { Link } from "react-router-dom";

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
          Welcome, please log in
          <Link to="/login" className="text-accent hover:underline hover:text-accent-strong pl-1.5">
            here
          </Link>
          , or sign up
          <Link to="/signup" className="text-accent hover:underline hover:text-accent-strong pl-1.5">
            here
          </Link>
          .
        </p>
      </div>
    );
  }
};
