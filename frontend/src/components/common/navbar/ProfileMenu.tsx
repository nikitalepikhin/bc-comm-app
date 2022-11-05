import { LockClosedIcon, SquaresPlusIcon, UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/redux/hooks";
import Dropdown from "../../uilib/dropdown/Dropdown";

interface Props {
  closeMenu: () => void;
}

export default function ProfileMenu(props: Props) {
  const { closeMenu } = props;
  const { role } = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <Dropdown
      onClick={closeMenu}
      gap="top-12"
      open="left"
      menuClassName={classNames("flex flex-col justify-center items-center ml-auto", "hidden lg:block")}
      buttonClassName={classNames(
        "w-fit p-2 rounded-md",
        "text-primary dark:text-white hover:text-slate-700 hover:dark:text-slate-200",
        "border border-transparent",
        "hover:border-slate-200 dark:hover:border-slate-700",
        "focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none focus:ring-blue-600/50",
        "flex flex-row justify-center items-center gap-1"
      )}
      items={[
        {
          type: "link",
          to: "/profile",
          name: "Edit Profile",
          icon: <UserIcon className="h-5 w-5" />,
          show: true,
        },
        {
          type: "link",
          to: `/channels/new`,
          name: "Create Channel",
          icon: <SquaresPlusIcon className="h-5 w-5" />,
          show: role === "TEACHER" || role === "STUDENT",
        },
        {
          type: "button",
          onClick: () => navigate("/logout"),
          name: "Log Out",
          icon: <LockClosedIcon className="h-5 w-5" />,
          show: true,
          danger: true,
        },
      ]}
    >
      <UserCircleIcon className="h-6 w-6" />
      <span className="hidden lg:inline">Profile</span>
    </Dropdown>
  );
}
