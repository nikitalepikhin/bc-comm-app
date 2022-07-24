import React from "react";
import useUserData from "../hooks/useUserData";
import RepresentativeVerificationRequestsPage from "../../features/representatives-verification/RepresentativeVerificationRequestsPage";

export const IndexPage: React.FC = () => {
  const { present, role } = useUserData();

  if (present && role === "ADMIN") {
    return <RepresentativeVerificationRequestsPage />;
  } else if (present && role === "REPRESENTATIVE") {
    return <div>representative page</div>;
  } else if (present && role === "TEACHER") {
    return <div>teacher page</div>;
  } else if (present && role === "STUDENT") {
    return <div>student page</div>;
  } else {
    return (
      <div className="m-2">
        <p className="inline">
          WELCOME, PLEASE LOG IN{" "}
          <a href="/login" className="text-blue-600 hover:underline hover:text-blue-800">
            HERE
          </a>
        </p>
      </div>
    );
  }
};
