import React from "react";
import { Outlet } from "react-router-dom";
import useAuthentication from "./features/auth/useAuthentication";
import LoadingPage from "./common/components/LoadingPage";
import Navbar from "./common/components/navbar/Navbar";

export default function App() {
  const { isLoading, isUninitialized } = useAuthentication();

  return (
    <>
      <Navbar />
      {isLoading || isUninitialized ? (
        <LoadingPage />
      ) : (
        <div className="2xl:max-w-screen-2xl mx-3 2xl:mx-auto">
          <Outlet />
        </div>
      )}
    </>
  );
}
