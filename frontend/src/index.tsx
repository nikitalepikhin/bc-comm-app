import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import "./index.css";
import "./inter.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/common/ErrorPage";
import IndexPage from "./components/common/IndexPage";
import SchoolsRoutes from "./app/routes/SchoolsRoutes";
import FacultiesRoutes from "./app/routes/FacultiesRoutes";
import ChannelsRoutes from "./app/routes/ChannelsRoutes";
import ProfilePage from "./components/auth/ProfilePage";
import ProtectedRoute from "./components/common/ProtectedRoute";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<IndexPage />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE", "TEACHER", "STUDENT"]}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="schools/*" element={<SchoolsRoutes />} />
            <Route path="faculties/school/*" element={<FacultiesRoutes />} />
            <Route path="channels/*" element={<ChannelsRoutes />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
