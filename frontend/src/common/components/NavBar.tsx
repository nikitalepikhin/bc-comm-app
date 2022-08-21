import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogOutMutation } from "../../app/enhancedApi";
import { useAppSelector } from "../../app/hooks";
import classNames from "classnames";

const NavBar: React.FC = () => {
  const { email, role } = useAppSelector((state) => state.auth.user);
  const location = useLocation();
  const [logOut] = useLogOutMutation();

  return (
    <div className="flex flex-row justify-between items-center px-4 bg-white shadow">
      <div className="flex flex-row justify-between gap-3 items-center">
        <Link
          to="/"
          className={classNames(
            "border-b-2 border-b-transparent hover:border-b-accent hover:border-b-accent px-4 py-3",
            { "text-secondary": location.pathname !== "/" }
          )}
        >
          Home
        </Link>
        <Link
          to="/debug"
          className={classNames(
            "border-b-2 border-b-transparent hover:border-b-accent hover:border-b-accent px-4 py-3",
            { "text-secondary": location.pathname !== "/debug" }
          )}
        >
          Debug
        </Link>
        <Link
          to="/schools"
          className={classNames(
            "border-b-2 border-b-transparent hover:border-b-accent hover:border-b-accent px-4 py-3",
            { "text-secondary": location.pathname !== "/schools" }
          )}
        >
          Schools
        </Link>
      </div>
      <div className="flex flex-row justify-between gap-1 items-center">
        {email !== undefined && (
          <div className="px-3 py-1 rounded-md">
            Logged in as <span className="font-bold">{`${email} (${role})`}</span>
          </div>
        )}
        {email !== undefined && (
          <button
            type="button"
            onClick={() => logOut()}
            className={classNames(
              "border-b-2 border-b-transparent hover:border-b-accent hover:border-b-accent px-4 py-3"
            )}
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
