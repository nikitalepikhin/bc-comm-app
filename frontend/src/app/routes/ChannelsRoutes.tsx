import React from "react";
import { Route, Routes } from "react-router-dom";
import AddChannelPage from "../../components/channels/AddChannelPage";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import ChannelPage from "../../components/channels/channel/ChannelPage";
import EditChannelPage from "../../components/channels/EditChannelPage";
import AddPostPage from "../../components/posts/AddPostPage";
import PostPage from "../../components/posts/PostPage";
import ChannelPosts from "../../components/posts/ChannelPosts";
import EditPostPage from "../../components/posts/EditPostPage";
import CommentThreadPage from "../../components/comments/CommentThreadPage";
import PostCommentsPage from "../../components/posts/PostCommentsPage";
import ErrorPage from "../../components/common/ErrorPage";

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
          <Route path="comment/:commentUuid/:highlight" element={<CommentThreadPage />} />
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
        <Route
          path="edit"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "STUDENT"]}>
              <EditChannelPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
