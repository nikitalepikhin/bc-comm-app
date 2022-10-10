import React, { ReactNode } from "react";
import { Link, To } from "react-router-dom";
import classNames from "classnames";

interface Props {
  to: To;
  icon: ReactNode;
  position?: "left" | "right";
  children?: string;
}

export default function LinkWithIcon(props: Props) {
  const { to, position = "left", icon, children } = props;

  return (
    <Link
      to={to}
      className={classNames(
        "text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400",
        "flex flex-row justify-start items-center gap-0.5"
      )}
    >
      {position === "left" && icon}
      <span>{children}</span>
      {position === "right" && icon}
    </Link>
  );
}
