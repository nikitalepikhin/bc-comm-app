import { PostComment } from "./post-comment";

export type OutPostCommentDto = Omit<PostComment, "parentUuid"> & {
  comments: OutPostCommentDto[];
};
