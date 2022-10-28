import { Link, To } from "react-router-dom";
import React from "react";
import classNames from "classnames";

interface Props {
  to: To;
  children: string;
  replace?: boolean;
  className?: string;
}

export default function StyledLink(props: Props) {
  const { to, children, className, replace = false } = props;
  return (
    <Link
      to={to}
      replace={replace}
      className={classNames(
        "text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400",
        "hover:underline",
        { [`${className}`]: className }
      )}
    >
      {children}
    </Link>
  );
}
