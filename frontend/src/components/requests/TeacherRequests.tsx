import { useGetTeacherVerificationRequestsQuery } from "../../app/enhancedApi";
import Alert from "../uilib/Alert";
import Button from "../uilib/Button";
import LoadingSpinner from "../uilib/LoadingSpinner";
import Request from "./Request";

export default function TeacherRequests() {
  const { data, isError, isFetching, isLoading, refetch } = useGetTeacherVerificationRequestsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <Alert show={isError} fullWidth severity="error" onClose={refetch}>
        Error loading teacher verification requests. Reload or try again later.
      </Alert>
    );
  }

  return (
    <div className="w-full flex flex-col justify-start gap-2">
      <Button type="button" onClick={() => refetch()} loading={isFetching}>
        Refresh requests
      </Button>
      {data && data.requests.map((request) => <Request key={request.user.uuid} request={request} type="TEACHER" />)}
      <Alert show={data !== undefined && data.requests.length === 0} severity="info" fullWidth>
        No pending requests.
      </Alert>
    </div>
  );
}
