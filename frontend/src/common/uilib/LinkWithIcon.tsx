import React, { ReactNode } from "react";
import { Link, To } from "react-router-dom";

interface Props {
  to: To;
  icon?: "left" | "right";
  svg?: ReactNode;
  children?: string;
}

export default function LinkWithIcon(props: Props) {
  const { to, icon = "left", svg, children } = props;

  return (
    <Link to={to} className="text-accent hover:text-accent-strong flex flex-row items-center gap-1">
      {icon === "left" && svg}
      <span className="pl-0.5">{children}</span>
      {icon === "right" && svg}
    </Link>
  );
}
