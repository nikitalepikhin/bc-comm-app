import { useParams } from "react-router-dom";

export default function PostPage() {
  const { textId, postUuid } = useParams() as { textId: string; postUuid: string };
  return <div>{`post (${postUuid}) for channel ${textId}`}</div>;
}
