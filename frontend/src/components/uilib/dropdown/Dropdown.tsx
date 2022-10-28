import { Menu } from "@headlessui/react";
import { Fragment, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";
import DropdownLink from "./DropdownLink";
import DropdownButton from "./DropdownButton";

interface DropdownItem {
  name: string;
  type: "link" | "button";
  show: boolean;
  to?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  danger?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface Props {
  items: DropdownItem[];
  textSmall?: boolean;
  children: ReactNode;
  buttonClassName?: string;
  menuClassName?: string;
  gap?: string;
  open?: "left" | "right";
  onClick?: () => void;
}

export default function Dropdown(props: Props) {
  const {
    children,
    items,
    buttonClassName,
    menuClassName,
    open = "right",
    gap = "top-10",
    textSmall = false,
    onClick,
  } = props;

  return (
    <Menu as="div" className={classNames("relative", menuClassName)}>
      <Menu.Button as={Fragment}>
        <button onClick={onClick} className={buttonClassName}>
          {children}
        </button>
      </Menu.Button>
      <Menu.Items
        unmount
        as="div"
        className={classNames(
          "flex flex-col justify-start items-stretch",
          "rounded-md mx-auto overflow-auto drop-shadow",
          "bg-white dark:bg-slate-900",
          "border border-slate-200 dark:border-slate-700",
          "absolute z-10",
          { "left-0": open === "right" },
          { "right-0": open === "left" },
          { [`${gap}`]: gap }
        )}
      >
        {items.map((item, index) => (
          <Menu.Item
            key={index}
            as="div"
            className={classNames(
              "hover:bg-slate-100 hover:dark:bg-slate-800",
              "whitespace-nowrap",
              "border-slate-200 dark:border-slate-700",
              "border-b last:border-b-0",
              { hidden: item.show === undefined || !item.show }
            )}
          >
            {() => {
              if (item.show === undefined || !item.show) {
                return null;
              }
              if (item.show && item.type === "link") {
                return (
                  <DropdownLink
                    to={item.to ?? "#"}
                    icon={item.icon}
                    iconPosition={item.iconPosition}
                    danger={item.danger}
                    textSmall={textSmall}
                  >
                    {item.name}
                  </DropdownLink>
                );
              } else if (item.show && item.type === "button") {
                return (
                  <DropdownButton
                    type="button"
                    icon={item.icon}
                    iconPosition={item.iconPosition}
                    danger={item.danger}
                    onClick={item.onClick}
                    textSmall={textSmall}
                  >
                    {item.name}
                  </DropdownButton>
                );
              }
            }}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
