import React from "react";
import { Outlet } from "react-router-dom";
import useAuthentication from "./features/auth/useAuthentication";
import LoadingPage from "./common/components/LoadingPage";
import NavBar from "./common/components/NavBar";

const App: React.FC = () => {
  const { isLoading, isUninitialized } = useAuthentication();
  // const { prefersDarkMode } = useDarkMode();todo
  return (
    <div id="app" className="font-inter text-primary bg-slate-100 dark:text-white dark:bg-slate-900 min-h-screen">
      {isLoading || isUninitialized ? (
        <LoadingPage />
      ) : (
        <>
          <NavBar />
          <div className="2xl:max-w-screen-2xl mx-3 2xl:mx-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
