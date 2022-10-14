import { Menu } from "@headlessui/react";
import Button from "../Button";
import { Fragment, MouseEventHandler, ReactNode } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
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
  children?: ReactNode;
  className?: string;
  gap?: string;
  open?: "left" | "right";
}

export default function Dropdown(props: Props) {
  const { children, items, className, open = "right", gap = "top-10", textSmall = false } = props;

  return (
    <Menu as="div" className={classNames("relative")}>
      <Menu.Button as="button" className={className}>
        {children ?? "Menu"}
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
              "border-y border-slate-200 dark:border-slate-700 border-b-0 first:border-t-0"
            )}
          >
            {() => {
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
              } else {
                return null;
              }
            }}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
