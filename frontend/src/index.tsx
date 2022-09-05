import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import "./inter.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import { DebugPage } from "./features/auth/DebugPage";
import NotFoundPage from "./common/components/NotFoundPage";
import { IndexPage } from "./common/components/IndexPage";
import SignupPage from "./features/auth/SignupPage";
import SchoolsRoutes from "./features/schools/SchoolsRoutes";
import FacultiesRoutes from "./features/faculties/FacultiesRoutes";
import ChannelsRoutes from "./features/channels/ChannelsRoutes";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<IndexPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            {process.env.MODE === "dev" && <Route path="debug" element={<DebugPage />} />}
            <Route path="schools/*" element={<SchoolsRoutes />} />
            <Route path="faculties/*" element={<FacultiesRoutes />} />
            <Route path="channels/*" element={<ChannelsRoutes />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
