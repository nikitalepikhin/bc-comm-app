import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-2">
      <p className="font-bold text-3xl">404 NOT FOUND 🙉</p>
      <p className="text-lg">This page does not exist</p>
      <Link to="/" replace className="hover:underline text-blue-600 hover:text-blue-800">
        Back to the home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
