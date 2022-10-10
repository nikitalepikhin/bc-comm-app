import { Link, To } from "react-router-dom";
import React from "react";
import classNames from "classnames";

interface Props {
  to: To;
  replace?: boolean;
  children: string;
}

export default function StyledLink(props: Props) {
  const { to, replace = false, children } = props;
  return (
    <Link
      to={to}
      replace={replace}
      className={classNames(
        "text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400",
        "hover:underline"
      )}
    >
      {children}
    </Link>
  );
}
