import Dropdown from "../../uilib/dropdown/Dropdown";
import useColorScheme from "../../hooks/useColorScheme";
import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

interface Props {
  closeMenu: () => void;
}

export default function ThemeSelector(props: Props) {
  const { closeMenu } = props;
  const { setScheme, scheme } = useColorScheme();

  return (
    <Dropdown
      onClick={closeMenu}
      gap="top-12"
      open="left"
      menuClassName="flex flex-col justify-center items-center ml-auto"
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
          show: true,
          type: "button",
          icon: <SunIcon className="h-5 w-5" />,
          name: "Light",
          onClick: () => setScheme("light"),
        },
        {
          show: true,
          type: "button",
          icon: <MoonIcon className="h-5 w-5" />,
          name: "Dark",
          onClick: () => setScheme("dark"),
        },
        {
          show: true,
          type: "button",
          icon: <ComputerDesktopIcon className="h-5 w-5" />,
          name: "System",
          onClick: () => setScheme("system"),
        },
      ]}
    >
      {scheme === "light" ? (
        <>
          <SunIcon className="h-6 w-6" />
          <span className="hidden md:inline">Display</span>
        </>
      ) : scheme === "dark" ? (
        <>
          <MoonIcon className="h-6 w-6" />
          <span className="hidden md:inline">Display</span>
        </>
      ) : (
        <>
          <ComputerDesktopIcon className="h-6 w-6" />
          <span className="hidden md:inline">Display</span>
        </>
      )}
    </Dropdown>
  );
}
