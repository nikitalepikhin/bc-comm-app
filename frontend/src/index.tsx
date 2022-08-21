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
import SchoolsManagementPage from "./features/schools/SchoolsManagementPage";
import { IndexPage } from "./common/components/IndexPage";
import AddSchoolPage from "./features/schools/AddSchoolPage";
import ProtectedRoute from "./common/components/ProtectedRoute";
import EditSchoolPage from "./features/schools/EditSchoolPage";
import FacultiesManagementPage from "./features/faculties/FacultiesManagementPage";
import AddFacultyPage from "./features/faculties/AddFacultyPage";
import EditFacultyPage from "./features/faculties/EditFacultyPage";

document.body.classList.add();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<IndexPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="debug" element={<DebugPage />} />
            <Route
              path="schools"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <SchoolsManagementPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="schools/new"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AddSchoolPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="schools/edit/:schoolUuid"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <EditSchoolPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="faculties/:schoolUuid"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE"]}>
                  <FacultiesManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="faculties/:schoolUuid/new"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE"]}>
                  <AddFacultyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="faculties/:schoolUuid/edit/:facultyUuid"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE"]}>
                  <EditFacultyPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
