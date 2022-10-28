import useUserData from "../../hooks/useUserData";
import AuthPage from "../auth/AuthPage";
import FeedPage from "../feed/FeedPage";
import RequestsPage from "../requests/RequestsPage";

export default function IndexPage() {
  const { present, role } = useUserData();

  if (present && (role === "ADMIN" || role === "REPRESENTATIVE")) {
    return <RequestsPage />;
  } else if (present && (role === "TEACHER" || role === "STUDENT")) {
    return <FeedPage />;
  } else {
    return <AuthPage />;
  }
}
