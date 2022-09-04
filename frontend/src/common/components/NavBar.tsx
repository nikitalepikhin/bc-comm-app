import React, { useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogOutMutation } from "../../app/enhancedApi";
import { useAppSelector } from "../../app/hooks";
import classNames from "classnames";
import NavBarLink from "./NavBarLink";
import ComboBox from "../ui/ComboBox";
import ChannelSearch from "../../features/channels/ChannelSearch";

const NavBar: React.FC = () => {
  const {
    present,
    user: { role },
  } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [logOut] = useLogOutMutation();
  const toggleRef = useRef(null);

  const onNavSelected = useCallback(() => {
    if (toggleRef.current !== null && (toggleRef.current as HTMLInputElement).checked) {
      (toggleRef.current as HTMLInputElement).checked = false;
    }
  }, [toggleRef]);

  return (
    <div className="grid grid-cols-2 items-center justify-between items-end px-4 bg-white shadow">
      <input type="checkbox" ref={toggleRef} className="hidden peer transition-all" id="toggle" />
      <Link to="/" onClick={onNavSelected} className="col-span-1 text-md lg:hidden inline-flex flex-row gap-1">
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
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-0 justify-start lg:justify-between items-center pb-2 lg:pb-0">
          <div className="flex flex-col lg:flex-row gap-1 lg:gap-0 justify-start lg:justify-between items-center w-full lg:w-fit">
            <Link to="/" onClick={onNavSelected} className="px-2 py-3 hidden lg:inline-flex flex-row gap-1 w-fit">
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
            {process.env.MODE === "dev" && (
              <NavBarLink to="/debug" onClick={onNavSelected}>
                Debug
              </NavBarLink>
            )}
            {present && role === "ADMIN" && (
              <NavBarLink to="/schools" onClick={onNavSelected}>
                Schools
              </NavBarLink>
            )}
          </div>
          <div>
            <ChannelSearch />
          </div>
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full lg:w-fit gap-1">
            {present && (
              <button
                type="button"
                onClick={() => {
                  logOut();
                  onNavSelected();
                }}
                className={classNames(
                  "border-2 hover:bg-gray border-transparent rounded-md lg:rounded-none lg:border-x-0 lg:border-t-0 px-6 py-3 w-full text-center transition-all"
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
