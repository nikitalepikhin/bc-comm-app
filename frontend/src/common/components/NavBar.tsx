import React from "react";
import { Link } from "react-router-dom";
import { useLogOutMutation } from "../../app/enhancedApi";
import { useAppSelector } from "../../app/hooks";

const NavBar: React.FC = () => {
  const { email, role } = useAppSelector((state) => state.auth.user);
  const [logOut] = useLogOutMutation();

  return (
    <div className="flex flex-row justify-between items-center p-2 bg-gray-600">
      <div className="flex flex-row justify-between gap-1 items-center">
        <Link to="/" className="text-gray-300 hover:text-white px-3 py-1">
          Home
        </Link>
        <Link to="/debug" className="text-gray-300 hover:text-white px-3 py-1">
          Debug
        </Link>
        <Link to="/schools" className="text-gray-300 hover:text-white px-3 py-1">
          Schools
        </Link>
      </div>
      <div className="flex flex-row justify-between gap-1 items-center">
        {email !== undefined && (
          <div className="px-3 py-1 bg-white rounded-md">
            Logged in as <span className="font-bold">{`${email} (${role})`}</span>
          </div>
        )}
        {email !== undefined && (
          <button type="button" onClick={() => logOut()} className="text-gray-300 hover:text-white px-3 py-1">
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
