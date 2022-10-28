import {
  Bars3Icon,
  BuildingLibraryIcon,
  HomeIcon,
  LockClosedIcon,
  SquaresPlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogOutMutation } from "../../../app/enhancedApi";
import { useAppSelector } from "../../../app/redux/hooks";
import ChannelSearch from "../../channels/ChannelSearch";
import NavbarButton from "./NavbarButton";
import NavbarItem from "./NavbarItem";
import ProfileMenu from "./ProfileMenu";
import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
  const navigate = useNavigate();
  const {
    present,
    user: { role, schoolUuid, verified },
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
            <NavbarButton onClick={() => navigate(`/faculties/school/${schoolUuid}`)} className="hidden md:flex">
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
      {(role === "REPRESENTATIVE" || role === "TEACHER") && !verified && (
        <div
          className={classNames(
            "bg-orange-400 dark:bg-orange-800 shadow dark:shadow-gray-800",
            "py-2 px-3 w-full z-10",
            "text-center dark:text-white"
          )}
        >
          <div className="font-bold">{`Account verification is required ${
            role === "REPRESENTATIVE" ? "to manage your school" : "to communicate with others"
          }.`}</div>
          <div className="text-sm">{`Wait to be verified by ${
            role === "REPRESENTATIVE" ? "an admin" : "your school's representative or an admin"
          }.`}</div>
        </div>
      )}
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
            <NavbarItem closeMenu={() => setOpen(false)} type="link" to={`/faculties/school/${schoolUuid}`}>
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