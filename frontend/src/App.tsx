import React, { useEffect } from "react";
import { useRefreshTokenMutation } from "./app/enhancedApi";
import { Outlet } from "react-router-dom";
import useAuthentication from "./common/hooks/useAuthentication";
import LoadingPage from "./pages/LoadingPage";

const App: React.FC = () => {
  useAuthentication();

  useEffect(() => {
    console.log("app mounted");
  }, []);

  const [, { isLoading, isUninitialized }] = useRefreshTokenMutation({ fixedCacheKey: "refresh-token-sub" });

  if (isLoading || isUninitialized) {
    return <LoadingPage />;
  } else {
    return <Outlet />;
  }
};

export default App;
