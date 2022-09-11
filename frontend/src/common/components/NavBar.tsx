import React, { useCallback, useEffect, useRef } from "react";
import {
  Bars3Icon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import ChannelSearch from "../../features/channels/ChannelSearch";
import NavBarLink from "./NavBarLink";
import { useAppSelector } from "../../app/hooks";
import { Link, useLocation } from "react-router-dom";
import { useLogOutMutation } from "../../app/enhancedApi";
import { RoleType } from "../../features/auth/authSlice";

const NavBar: React.FC = () => {
  const {
    present,
    user: { role, email },
  } = useAppSelector((state) => state.auth);

  const [logOut] = useLogOutMutation();

  const menuRef = useRef(null);
  const profileRef = useRef(null);
  // const profileMenuRef = useRef(null);
  const searchRef = useRef(null);

  const onSelected = useCallback(() => {
    if (menuRef.current !== null && (menuRef.current as HTMLInputElement).checked) {
      (menuRef.current as HTMLInputElement).checked = false;
    }
    if (profileRef.current !== null && (profileRef.current as HTMLInputElement).checked) {
      (profileRef.current as HTMLInputElement).checked = false;
    }
    if (searchRef.current !== null && (searchRef.current as HTMLInputElement).checked) {
      (searchRef.current as HTMLInputElement).checked = false;
    }
  }, [menuRef, profileRef, searchRef]);

  // todo - handle click outside
  // useEffect(() => {
  //   function handleClickOutside(event: any) {
  //     // @ts-ignore
  //     if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
  //       onSelected();
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [profileMenuRef]);

  return (
    <nav className="grid grid-cols-2 lg:flex lg:flex-row justify-between items-center px-4 py-3 shadow">
      <input type="checkbox" id="menu" className="hidden peer transition-all" ref={menuRef} />
      <div className="col-span-1 lg:hidden">
        <Link to="/" onClick={onSelected}>
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
        </Link>
      </div>

      {present && (
        <label htmlFor="menu" className="block lg:hidden cursor-pointer col-span-1 ml-auto">
          <Bars3Icon className="h-6 w-6" />
        </label>
      )}

      <div className="col-span-full hidden peer-checked:flex lg:flex flex-col lg:flex-row justify-between items-center gap-4">
        <Link to="/" onClick={onSelected}>
          <div className="hidden lg:flex flex-row justify-between items-center gap-1">
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
            <span className="uppercase hidden lg:inline">CommApp</span>
          </div>
        </Link>
        {process.env.MODE === "dev" && (
          <NavBarLink to="/debug" onClick={onSelected}>
            Debug
          </NavBarLink>
        )}
        {present && role === "ADMIN" && (
          <NavBarLink to="/schools" onClick={onSelected}>
            Schools
          </NavBarLink>
        )}
      </div>

      <div className="col-span-full hidden peer-checked:flex lg:flex flex-col lg:flex-row-reverse justify-between items-center gap-4">
        {present && (
          <div>
            <input type="checkbox" id="profile" className="hidden peer transition-all" ref={profileRef} />
            <label htmlFor="profile" className="cursor-pointer hidden lg:block">
              <UserCircleIcon className="h-6 w-6" />
            </label>
            <div className="flex lg:hidden peer-checked:flex flex-col justify-between items-center lg:fixed lg:top-14 lg:right-2 lg:shadow lg:p-4 lg:bg-white lg:rounded-md">
              <div>{`Profile (${email})`}</div>
              {role && (["REPRESENTATIVE", "TEACHER", "STUDENT"] as RoleType[]).includes(role) && (
                <NavBarLink to="/channels/new">Create channel</NavBarLink>
              )}
              <button
                onClick={() => {
                  logOut();
                  onSelected();
                }}
              >
                Log out
              </button>
            </div>
          </div>
        )}

        {present && (
          <div className="flex flex-row justify-between items-center gap-2">
            <input type="checkbox" id="search" className="hidden peer transition-all" ref={searchRef} />
            <label htmlFor="search" className="cursor-pointer hidden lg:block">
              <MagnifyingGlassCircleIcon className="h-6 w-6" />
            </label>
            <div className="lg:peer-checked:block lg:hidden">
              <ChannelSearch onSelected={onSelected} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
