import { PostComment } from "./post-comment";

export type OutPostCommentDto = PostComment & {
  comments: OutPostCommentDto[];
};
