import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <div className="flex flex-row justify-start items-center p-2 bg-gray-600">
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
  );
};

export default NavBar;
