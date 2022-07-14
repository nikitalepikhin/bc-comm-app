import React from "react";
import { useAppSelector } from "../app/hooks";
import { IndexPage } from "./IndexPage";
import AdminRequestsPage from "./AdminRequestsPage";

const IndexPageResolver: React.FC = () => {
  const { email, role } = useAppSelector((state) => state.auth.user);

  if (email && role === "ADMIN") {
    return <AdminRequestsPage />;
  } else if (email && role === "REPRESENTATIVE") {
    return <div>representative page</div>;
  } else if (email && role === "TEACHER") {
    return <div>teacher page</div>;
  } else if (email && role === "STUDENT") {
    return <div>student page</div>;
  } else {
    return <IndexPage />;
  }
};

export default IndexPageResolver;
