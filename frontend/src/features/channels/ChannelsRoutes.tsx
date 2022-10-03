import React from "react";
import { Route, Routes } from "react-router-dom";
import AddChannelPage from "./AddChannelPage";
import ProtectedRoute from "../../common/components/ProtectedRoute";
import ChannelPage from "./ChannelPage";
import EditChannelPage from "./EditChannelPage";
import AddPostPage from "../posts/AddPostPage";
import PostPage from "../posts/PostPage";
import ChannelPosts from "../posts/ChannelPosts";
import EditPostPage from "../posts/EditPostPage";
import CommentThreadPage from "../comments/CommentThreadPage";
import PostCommentsPage from "../posts/PostCommentsPage";

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
      >
        <Route index element={<ChannelPosts />} />
        <Route path="post/:postUuid" element={<PostPage />}>
          <Route index element={<PostCommentsPage />} />
          <Route path="comment/:commentUuid" element={<CommentThreadPage />} />
        </Route>
        <Route path="post/:postUuid/edit" element={<EditPostPage />} />
        <Route
          path="post/new"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "STUDENT"]}>
              <AddPostPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/:textId/edit"
        element={
          <ProtectedRoute allowedRoles={["TEACHER", "STUDENT"]}>
            <EditChannelPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
