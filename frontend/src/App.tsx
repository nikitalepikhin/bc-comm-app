import React from "react";
import { useRefreshTokenMutation } from "./app/enhancedApi";
import { Outlet, useLocation } from "react-router-dom";
import useAuthentication from "./common/hooks/useAuthentication";
import LoadingPage from "./common/components/LoadingPage";
import NavBar from "./NavBar";

const App: React.FC = () => {
  useAuthentication();
  const [, { isLoading, isUninitialized }] = useRefreshTokenMutation({ fixedCacheKey: "refresh-token-sub" });

  return (
    <div>
      {isLoading || isUninitialized ? (
        <LoadingPage />
      ) : (
        <>
          <NavBar />
          <div className="2xl:max-w-screen-2xl mx-4 my-2 2xl:mx-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
