import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../common/components/ProtectedRoute";
import SchoolsManagementPage from "./SchoolsManagementPage";
import AddSchoolPage from "./AddSchoolPage";
import EditSchoolPage from "./EditSchoolPage";

const SchoolsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <SchoolsManagementPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/new"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AddSchoolPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:schoolUuid/edit"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <EditSchoolPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default SchoolsRoutes;
