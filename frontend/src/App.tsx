import React from "react";
import { Outlet } from "react-router-dom";
import useAuthentication from "./hooks/useAuthentication";
import LoadingPage from "./components/common/LoadingPage";
import Navbar from "./components/common/navbar/Navbar";

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
