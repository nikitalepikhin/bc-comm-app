import classNames from "classnames";
import {
  Bars3Icon,
  BuildingLibraryIcon,
  HomeIcon,
  LockClosedIcon,
  PencilSquareIcon,
  SquaresPlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ChannelSearch from "../../../features/channels/ChannelSearch";
import ThemeSelector from "./ThemeSelector";
import NavbarButton from "./NavbarButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { useLogOutMutation } from "../../../app/enhancedApi";
import NavbarItem from "./NavbarItem";
import { useAppSelector } from "../../../app/hooks";

export default function Navbar() {
  const navigate = useNavigate();
  const {
    present,
    user: { role },
  } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [logOut] = useLogOutMutation();

  return (
    <>
      <nav
        className={classNames(
          "sticky top-0 left-0 px-3 py-1.5",
          "bg-white dark:bg-slate-800",
          "border-b border-slate-200 dark:border-slate-700",
          { "shadow dark:shadow-gray-800": !open },
          "flex flex-row justify-between items-center gap-2",
          { hidden: !present }
        )}
      >
        <div className="flex flex-row justify-between items-center gap-2">
          <NavbarButton onClick={() => navigate("/")}>
            <HomeIcon className="h-6 w-6" />
            <span className="hidden md:inline">Home</span>
          </NavbarButton>
          {role === "ADMIN" && (
            <NavbarButton onClick={() => navigate("/schools")} className="hidden md:flex">
              <BuildingLibraryIcon className="h-6 w-6" />
              <span className="hidden md:inline">Schools</span>
            </NavbarButton>
          )}
          {role === "REPRESENTATIVE" && (
            <NavbarButton onClick={() => navigate("/schools/schoolUuid/facultyUuid")} className="hidden md:flex">
              <BuildingLibraryIcon className="h-6 w-6" />
              <span className="hidden md:inline">Faculties</span>
            </NavbarButton>
          )}
        </div>
        <div className="w-full max-w-screen-sm">
          <ChannelSearch onSelected={() => setOpen(false)} />
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
          <ThemeSelector closeMenu={() => setOpen(false)} />
          <NavbarButton onClick={() => setOpen(!open)} className="md:hidden">
            <Bars3Icon className="h-6 w-6" />
          </NavbarButton>
          <ProfileMenu closeMenu={() => setOpen(false)} />
        </div>
      </nav>
      {open && (
        <div
          className={classNames(
            "md:hidden",
            "sticky top-[3.44rem] left-0",
            "shadow dark:shadow-gray-800",
            "flex flex-col justify-center items-center",
            "bg-white dark:bg-slate-800",
            "border-b border-slate-200 dark:border-slate-700"
          )}
        >
          <NavbarItem closeMenu={() => setOpen(false)} type="link" to="/profile">
            <UserIcon className="h-5 w-5" />
            <span>Edit Profile</span>
          </NavbarItem>
          {role === "ADMIN" && (
            <NavbarItem closeMenu={() => setOpen(false)} type="link" to="/schools">
              <BuildingLibraryIcon className="h-5 w-5" />
              <span>Schools</span>
            </NavbarItem>
          )}
          {role === "REPRESENTATIVE" && (
            <NavbarItem closeMenu={() => setOpen(false)} type="link" to="/schools/schoolUuid/edit">
              <PencilSquareIcon className="h-5 w-5" />
              <span>Edit School</span>
            </NavbarItem>
          )}
          {role === "REPRESENTATIVE" && (
            <NavbarItem closeMenu={() => setOpen(false)} type="link" to="/faculties">
              <BuildingLibraryIcon className="h-5 w-5" />
              <span>Faculties</span>
            </NavbarItem>
          )}
          {(role === "TEACHER" || role === "STUDENT") && (
            <NavbarItem closeMenu={() => setOpen(false)} type="link" to="/channels/new">
              <SquaresPlusIcon className="h-5 w-5" />
              <span>Create Channel</span>
            </NavbarItem>
          )}
          <NavbarItem closeMenu={() => setOpen(false)} type="button" onClick={() => logOut()} danger>
            <LockClosedIcon className="h-5 w-5" />
            <span>Log Out</span>
          </NavbarItem>
        </div>
      )}
    </>
  );
}
