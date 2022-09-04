import React from "react";
import { Route, Routes } from "react-router-dom";
import AddChannelPage from "./AddChannelPage";
import ProtectedRoute from "../../common/components/ProtectedRoute";

const ChannelsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/new"
        element={
          <ProtectedRoute allowedRoles={["REPRESENTATIVE", "TEACHER", "STUDENT"]}>
            <AddChannelPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default ChannelsRoutes;
