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
        <div className="3xl:max-w-screen-3xl mx-3 3xl:mx-auto">
          <Outlet />
        </div>
      )}
    </>
  );
}
