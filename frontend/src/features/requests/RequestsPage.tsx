import React from "react";
import { useAppSelector } from "../../app/hooks";
import Tabs from "../../common/uilib/Tabs";
import TeacherRequests from "./TeacherRequests";
import RepresentativeRequests from "./RepresentativeRequests";
import PageWrapper from "../../common/uilib/PageWrapper";

const RequestsPage: React.FC = () => {
  const { role } = useAppSelector((state) => state.auth.user);

  return (
    <PageWrapper className="flex flex-col justify-start items-center gap-2 w-full max-w-screen-md mx-auto">
      <Tabs
        tabItems={[
          { name: "Teacher Requests", element: <TeacherRequests /> },
          { name: "Representative Requests", element: <RepresentativeRequests />, render: role === "ADMIN" },
        ]}
      />
    </PageWrapper>
  );
};

export default RequestsPage;
