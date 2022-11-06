import { useAppSelector } from "../../app/redux/hooks";
import PageWrapper from "../uilib/PageWrapper";
import Tabs from "../uilib/Tabs";
import RepresentativeRequests from "./RepresentativeRequests";
import TeacherRequests from "./TeacherRequests";

export default function RequestsPage() {
  const { role } = useAppSelector((state) => state.auth.user);

  return (
    <PageWrapper className="flex flex-col justify-start items-center gap-2 w-full max-w-screen-md mx-auto">
      <Tabs
        tabItems={[
          { name: "Teacher", element: <TeacherRequests /> },
          { name: "Representative", element: <RepresentativeRequests />, render: role === "ADMIN" },
        ]}
      />
    </PageWrapper>
  );
}
