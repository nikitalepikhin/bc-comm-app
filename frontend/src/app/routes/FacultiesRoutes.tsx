import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import FacultiesPage from "../../components/faculties/FacultiesPage";
import ErrorPage from "../../components/common/ErrorPage";

export default function FacultiesRoutes() {
  return (
    <Routes>
      <Route
        path="/:schoolUuid"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE"]}>
            <FacultiesPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
