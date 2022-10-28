import React, { ReactNode } from "react";
import { Link, To } from "react-router-dom";
import classNames from "classnames";

interface Props {
  to: To;
  icon: ReactNode;
  position?: "left" | "right";
  children?: string;
  className?: string;
}

export default function LinkWithIcon(props: Props) {
  const { to, icon, children, className, position = "left" } = props;

  return (
    <Link
      to={to}
      className={classNames(
        "text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400",
        "flex flex-row justify-start items-center gap-1",
        { [`${className}`]: className }
      )}
    >
      {position === "left" && icon}
      <span>{children}</span>
      {position === "right" && icon}
    </Link>
  );
}
