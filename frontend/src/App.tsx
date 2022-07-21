import React, { useEffect } from "react";
import { useLogOutMutation, useRefreshTokenMutation } from "./app/enhancedApi";
import { Outlet } from "react-router-dom";
import useAuthentication from "./common/hooks/useAuthentication";
import LoadingPage from "./pages/LoadingPage";

const App: React.FC = () => {
  useAuthentication();

  useEffect(() => {
    console.log("app mounted");
  }, []);

  const [, { isLoading, isUninitialized }] = useRefreshTokenMutation({ fixedCacheKey: "refresh-token-sub" });

  const [logOut] = useLogOutMutation();

  if (isLoading || isUninitialized) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <div className="m-4">
          <button
            onClick={() => logOut()}
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-1.5 rounded-md w-fit"
          >
            Log out
          </button>
        </div>
        <Outlet />
      </>
    );
  }
};

export default App;
