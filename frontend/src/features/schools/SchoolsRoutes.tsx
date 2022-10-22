import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../common/components/ProtectedRoute";
import EditSchoolPage from "./legacy/EditSchoolPage";
import SchoolsPage from "./SchoolsPage";

const SchoolsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <SchoolsPage />
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
