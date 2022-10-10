import { Link, To } from "react-router-dom";
import React from "react";

interface Props {
  to: To;
  children: string;
}

export default function StyledLink(props: Props) {
  const { to, children } = props;
  return (
    <Link to={to} className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">
      {children}
    </Link>
  );
}
