import React from "react";
import { useRefreshTokenMutation } from "./app/enhancedApi";
import { Outlet } from "react-router-dom";
import useAuthentication from "./common/hooks/useAuthentication";
import LoadingPage from "./common/components/LoadingPage";

const App: React.FC = () => {
  useAuthentication();

  const [, { isLoading, isUninitialized }] = useRefreshTokenMutation({ fixedCacheKey: "refresh-token-sub" });

  return (
    <div className="2xl:max-w-screen-2xl m-2 2xl:mx-auto">
      {isLoading || isUninitialized ? <LoadingPage /> : <Outlet />}
    </div>
  );
};

export default App;
