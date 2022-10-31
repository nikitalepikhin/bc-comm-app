import { createContext } from "react";
import { Props as PostProps } from "./Post";

interface PostContextType extends PostProps {
  onDelete: () => void;
}

const PostContext = createContext<PostContextType>({
  uuid: "uuid",
  title: "title",
  body: "body",
  created: "created",
  modified: "modified",
  author: "author",
  isAuthor: false,
  authorIsTeacher: false,
  edited: false,
  up: 0,
  down: 0,
  dir: 0,
  commentsCount: 0,
  channelTextId: "textId",
  showExpanded: false,
  onDelete: () => {},
});

export default PostContext;
