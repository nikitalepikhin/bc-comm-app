import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../common/components/ProtectedRoute";
import CommentPage from "./CommentPage";

export default function CommentsRoutes() {
  return (
    <Routes>
      <Route
        path="/:commentUuid"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE", "TEACHER", "STUDENT"]}>
            <CommentPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
