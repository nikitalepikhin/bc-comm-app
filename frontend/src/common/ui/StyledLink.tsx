import { Link, To } from "react-router-dom";
import React from "react";

interface LinkPropsType {
  to: To;
}

const StyledLink: React.FC<LinkPropsType> = ({ to, children }) => {
  return (
    <Link to={to} className="text-accent hover:text-accent-strong flex flex-row items-center">
      {children}
    </Link>
  );
};

export default StyledLink;
