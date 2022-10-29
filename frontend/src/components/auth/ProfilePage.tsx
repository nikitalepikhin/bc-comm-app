import PageWrapper from "../uilib/PageWrapper";
import classNames from "classnames";
import { useAppSelector } from "../../app/redux/hooks";
import EditAccount from "./EditAccount";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";

export default function ProfilePage() {
  const { role } = useAppSelector((state) => state.auth.user);

  return (
    <PageWrapper
      className={classNames(
        "flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start gap-2"
      )}
    >
      <EditAccount />
      <div className="flex flex-col justify-start items-center gap-2 w-full">
        {(role === "REPRESENTATIVE" || role === "TEACHER") && <EditProfile />}
        {(role === "STUDENT" || role === "TEACHER") && <DeleteAccount />}
      </div>
    </PageWrapper>
  );
}
