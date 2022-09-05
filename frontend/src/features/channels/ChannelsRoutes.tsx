import React from "react";
import { Route, Routes } from "react-router-dom";
import AddChannelPage from "./AddChannelPage";
import ProtectedRoute from "../../common/components/ProtectedRoute";
import ChannelPage from "./ChannelPage";

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
      <Route
        path="/:textId"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE", "TEACHER", "STUDENT"]}>
            <ChannelPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default ChannelsRoutes;
