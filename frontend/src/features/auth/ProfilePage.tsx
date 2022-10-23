import PageWrapper from "../../common/uilib/PageWrapper";
import classNames from "classnames";
import { useAppSelector } from "../../app/hooks";
import EditAccount from "./EditAccount";
import EditProfile from "./EditProfile";

export default function ProfilePage() {
  const { role } = useAppSelector((state) => state.auth.user);

  return (
    <PageWrapper
      className={classNames(
        "flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start gap-2"
      )}
    >
      <EditAccount />
      {(role === "REPRESENTATIVE" || role === "TEACHER") && <EditProfile />}
    </PageWrapper>
  );
}
