import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPageResolver from "./pages/IndexPageResolver";
import LoadingPage from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import { DebugPage } from "./pages/DebugPage";
import NotFoundPage from "./pages/NotFoundPage";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<IndexPageResolver />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/debug"} element={<DebugPage />} />
            {/*<Route path={'/signup'} element={isLoading ? <LoadingPage /> : <SignupPage />} />*/}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
