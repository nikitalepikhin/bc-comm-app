import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import useAuthentication from "./features/auth/useAuthentication";
import LoadingPage from "./common/components/LoadingPage";
import NavBar from "./common/components/NavBar";
import { useAppSelector } from "./app/hooks";

const App: React.FC = () => {
  const { isLoading, isUninitialized } = useAuthentication();
  const { present } = useAppSelector((state) => state.auth);
  // const { prefersDarkMode } = useDarkMode();todo
  return isLoading || isUninitialized ? (
    <LoadingPage />
  ) : (
    <>
      {present && <NavBar />}
      <div className="2xl:max-w-screen-2xl mx-3 2xl:mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default App;
