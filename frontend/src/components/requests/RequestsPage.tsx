import React from "react";
import { useAppSelector } from "../../app/redux/hooks";
import Tabs from "../uilib/Tabs";
import TeacherRequests from "./TeacherRequests";
import RepresentativeRequests from "./RepresentativeRequests";
import PageWrapper from "../uilib/PageWrapper";

export default function RequestsPage(){
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
