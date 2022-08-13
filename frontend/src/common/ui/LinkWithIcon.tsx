import React, { ReactNode } from "react";
import { Link, To } from "react-router-dom";

interface LinkWithIconPropsType {
  to: To;
  svg: ReactNode;
}

const LinkWithIcon: React.FC<LinkWithIconPropsType> = ({ to, svg, children }) => {
  return (
    <Link to={to} className="text-blue-600 hover:text-blue-800 flex flex-row items-center">
      {svg}
      <span className="pl-0.5">{children}</span>
    </Link>
  );
};

export default LinkWithIcon;
