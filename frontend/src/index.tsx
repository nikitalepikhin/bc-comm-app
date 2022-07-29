import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import { DebugPage } from "./features/auth/DebugPage";
import NotFoundPage from "./common/components/NotFoundPage";
import SchoolsManagementPage from "./features/schools/SchoolsManagementPage";
import { IndexPage } from "./common/components/IndexPage";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<IndexPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/debug"} element={<DebugPage />} />
            <Route path={"/schools"} element={<SchoolsManagementPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
