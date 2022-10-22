import classNames from "classnames";
import {
  BuildingLibraryIcon,
  LockClosedIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Dropdown from "../../uilib/dropdown/Dropdown";
import { useLogOutMutation } from "../../../app/enhancedApi";
import { useAppSelector } from "../../../app/hooks";

interface Props {
  closeMenu: () => void;
}

export default function ProfileMenu(props: Props) {
  const { closeMenu } = props;
  const [logOut] = useLogOutMutation();
  const { role } = useAppSelector((state) => state.auth.user);

  return (
    <Dropdown
      onClick={closeMenu}
      gap="top-12"
      open="left"
      menuClassName={classNames("flex flex-col justify-center items-center ml-auto", "hidden md:block")}
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
          onClick: () => logOut(),
          name: "Log Out",
          icon: <LockClosedIcon className="h-5 w-5" />,
          show: true,
          danger: true,
        },
      ]}
    >
      <UserCircleIcon className="h-6 w-6" />
      <span className="hidden md:inline">Profile</span>
    </Dropdown>
  );
}
