import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

interface Props {
  to: string;
  onClick: () => void;
  className?: string;
}

const NavBarLink: React.FC<Props> = ({ children, to, onClick, className = "" }) => {
  const location = useLocation();

  return (
    <Link
      to={to}
      onClick={onClick}
      className={classNames(
        "border-2 hover:bg-gray rounded-md lg:rounded-none lg:border-x-0 lg:border-t-0 px-6 py-3 w-full text-center transition-all",
        {
          "border-accent": location.pathname === to,
        },
        {
          "border-transparent": location.pathname !== to,
        },
        className
      )}
    >
      {children}
    </Link>
  );
};

export default NavBarLink;
