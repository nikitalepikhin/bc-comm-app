import React, { useEffect } from "react";
import { useRefreshTokenMutation } from "./app/enhancedApi";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { DebugPage } from "./pages/DebugPage";
import { IndexPage } from "./pages/IndexPage";

const App: React.FC = () => {
  const [refreshToken, {}] = useRefreshTokenMutation();

  useEffect(() => {
    console.log("APP MOUNTED");
    refreshToken();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/debug"} element={<DebugPage />} />
        {/*<Route path={'/signup'} element={<SignupPage />} />*/}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
