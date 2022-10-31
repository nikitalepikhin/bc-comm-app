import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import SchoolsPage from "../../components/schools/SchoolsPage";
import ErrorPage from "../../components/common/ErrorPage";

export default function SchoolsRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <SchoolsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
