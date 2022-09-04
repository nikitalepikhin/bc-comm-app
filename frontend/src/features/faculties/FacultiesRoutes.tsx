import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../common/components/ProtectedRoute";
import FacultiesManagementPage from "./FacultiesManagementPage";
import AddFacultyPage from "./AddFacultyPage";
import EditFacultyPage from "./EditFacultyPage";

const FacultiesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/:schoolUuid"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE"]}>
            <FacultiesManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:schoolUuid/new"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE"]}>
            <AddFacultyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:schoolUuid/edit/:facultyUuid"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE"]}>
            <EditFacultyPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default FacultiesRoutes;
