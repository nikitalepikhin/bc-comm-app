import { useParams } from "react-router-dom";

export default function CommentPage() {
  const { commentUuid } = useParams() as { commentUuid: string };

  return <div>{`comment page for comment ${commentUuid}`}</div>;
}
