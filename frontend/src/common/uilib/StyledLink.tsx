import { Link, To } from "react-router-dom";
import React from "react";

interface LinkPropsType {
  to: To;
}

const StyledLink: React.FC<LinkPropsType> = ({ to, children }) => {
  return (
    <Link to={to} className="text-accent hover:text-accent-strong">
      {children}
    </Link>
  );
};

export default StyledLink;
