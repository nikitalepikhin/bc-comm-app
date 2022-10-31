import { Route, Routes } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import ProtectedRoute from "../common/ProtectedRoute";
import TeacherProfilePage from "./TeacherProfilePage";

export default function ProfileRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE", "TEACHER", "STUDENT"]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/:username"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE", "TEACHER", "STUDENT"]}>
            <TeacherProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
