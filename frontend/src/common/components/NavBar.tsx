import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogOutMutation } from "../../app/enhancedApi";
import { useAppSelector } from "../../app/hooks";
import classNames from "classnames";

const NavBar: React.FC = () => {
  const { present } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [logOut] = useLogOutMutation();

  return (
    <div className="grid grid-cols-2 items-center justify-between items-end px-4 bg-white shadow">
      <input type="checkbox" className="hidden peer transition-all" id="toggle" />
      <Link to="/" className="col-span-1 text-md lg:hidden inline-flex flex-row gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span className="uppercase font-bold">CommApp</span>
      </Link>
      <label htmlFor="toggle" className="lg:hidden px-4 py-3 cursor-pointer ml-auto w-fit col-span-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>

      <nav className="peer-checked:block hidden lg:block w-full col-span-2">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center pb-2 lg:pb-0">
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full lg:w-fit">
            <Link to="/" className="px-2 py-3 hidden lg:inline-flex flex-row gap-1 w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="uppercase font-bold">CommApp</span>
            </Link>
            <Link
              to="/"
              className={classNames(
                "border-2 lg:border-l-0 lg:border-r-0 lg:border-t-0 border-transparent hover:border-accent lg:hover:border-transparent lg:hover:border-b-accent rounded-md lg:rounded-none px-6 py-3 w-full text-center",
                { "text-secondary": location.pathname !== "/" }
              )}
            >
              Home
            </Link>
            {process.env.MODE === "dev" && (
              <Link
                to="/debug"
                className={classNames(
                  "border-2 lg:border-l-0 lg:border-r-0 lg:border-t-0 border-transparent hover:border-accent lg:hover:border-transparent lg:hover:border-b-accent rounded-md lg:rounded-none px-6 py-3 w-full text-center",
                  { "text-secondary": location.pathname !== "/debug" }
                )}
              >
                Debug
              </Link>
            )}
            {present && (
              <Link
                to="/schools"
                className={classNames(
                  "border-2 lg:border-l-0 lg:border-r-0 lg:border-t-0 border-transparent hover:border-accent lg:hover:border-transparent lg:hover:border-b-accent rounded-md lg:rounded-none px-6 py-3 w-full text-center",
                  { "text-secondary": location.pathname !== "/schools" }
                )}
              >
                Schools
              </Link>
            )}
          </div>
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full lg:w-fit">
            {/*{email !== undefined && (*/}
            {/*  <div className="px-3 py-1 rounded-md">*/}
            {/*    Logged in as <span className="font-bold">{`${email} (${role})`}</span>*/}
            {/*  </div>*/}
            {/*)}*/}
            {present && (
              <button
                type="button"
                onClick={() => logOut()}
                className={classNames(
                  "border-2 lg:border-l-0 lg:border-r-0 lg:border-t-0 border-transparent hover:border-accent lg:hover:border-transparent lg:hover:border-b-accent rounded-md lg:rounded-none px-4 py-3 w-full text-center"
                )}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
