import React from "react";
import { Route, Routes } from "react-router-dom";
import AddChannelPage from "./AddChannelPage";
import ProtectedRoute from "../../common/components/ProtectedRoute";
import ChannelPage from "./ChannelPage";
import EditChannelPage from "./EditChannelPage";
import AddPostPage from "../posts/AddPostPage";
import PostPage from "../posts/PostPage";

export default function ChannelsRoutes() {
  return (
    <Routes>
      <Route
        path="/new"
        element={
          <ProtectedRoute allowedRoles={["TEACHER", "STUDENT"]}>
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
      <Route
        path="/:textId/edit"
        element={
          <ProtectedRoute allowedRoles={["TEACHER", "STUDENT"]}>
            <EditChannelPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:textId/post/new"
        element={
          <ProtectedRoute allowedRoles={["TEACHER", "STUDENT"]}>
            <AddPostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:textId/post/:postUuid"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "REPRESENTATIVE", "TEACHER", "STUDENT"]}>
            <PostPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
