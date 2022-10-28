import { Link, To } from "react-router-dom";
import { MouseEventHandler, ReactNode } from "react";
import button from "../../uilib/Button";
import classNames from "classnames";

interface Props {
  type: "link" | "button";
  closeMenu: () => void;
  children: ReactNode;
  to?: To;
  onClick?: () => void;
  danger?: boolean;
}

export default function NavbarItem(props: Props) {
  const { type, to, onClick, closeMenu, children, danger = false } = props;

  if (type === "link" && to) {
    return (
      <Link
        to={to}
        onClick={() => closeMenu()}
        className={classNames(
          "flex flex-row justify-center items-center gap-1 w-full",
          "px-3 py-2",
          {
            "text-red-600 hover:text-red-800": danger,
          },
          "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900",
          "border-b border-slate-200 dark:border-slate-700 last:border-transparent"
        )}
      >
        {children}
      </Link>
    );
  } else if (type === "button" && onClick) {
    return (
      <button
        type="button"
        onClick={() => {
          closeMenu();
          onClick();
        }}
        className={classNames(
          "flex flex-row justify-center items-center gap-1 w-full",
          "px-3 py-2",
          {
            "text-red-600 hover:text-red-800": danger,
          },
          "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900",
          "border-b border-slate-200 dark:border-slate-700 last:border-transparent"
        )}
      >
        {children}
      </button>
    );
  } else {
    return null;
  }
}
