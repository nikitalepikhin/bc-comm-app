import React from "react";
import { Link } from "react-router-dom";
import { useLogOutMutation } from "../../app/enhancedApi";

const NavBar: React.FC = () => {
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
      <div>
        <button type="button" onClick={() => logOut()} className="text-gray-300 hover:text-white px-3 py-1">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
