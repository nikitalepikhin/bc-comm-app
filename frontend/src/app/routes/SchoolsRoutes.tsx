import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import SchoolsPage from "../../components/schools/SchoolsPage";

export default function SchoolsRoutes() {
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
    </Routes>
  );
}
