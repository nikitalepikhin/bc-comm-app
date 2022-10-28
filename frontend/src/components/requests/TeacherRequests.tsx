import { useGetTeacherVerificationRequestsQuery } from "../../app/enhancedApi";
import LoadingSpinner from "../uilib/LoadingSpinner";
import Alert from "../uilib/Alert";
import Request from "./Request";

export default function TeacherRequests() {
  const { data, isLoading, isError, isFetching, refetch } = useGetTeacherVerificationRequestsQuery();

  if (isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <Alert show={isError} fullWidth severity="error" onClose={refetch}>
        An error occurred while loading teacher verification requests. Reload or try again later.
      </Alert>
    );
  }

  if (data && data.requests.length > 0) {
    return (
      <div className="w-full flex flex-col justify-start gap-2">
        {data.requests.map((request) => (
          <Request key={request.user.uuid} request={request} type="TEACHER" />
        ))}
      </div>
    );
  } else {
    return (
      <Alert show severity="info" fullWidth onClose={() => refetch()}>
        No pending requests. Close this alert to reload.
      </Alert>
    );
  }
}
