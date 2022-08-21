import React from "react";
import RepresentativeVerificationRequest from "./RepresentativeVerificationRequest";
import { useGetRepresentativeVerificationRequestsQuery } from "../../app/enhancedApi";
import LoadingButton from "../../common/ui/LoadingButton";

const RepresentativeVerificationRequestsPage: React.FC = () => {
  const { data, isFetching, error, refetch } = useGetRepresentativeVerificationRequestsQuery();
  return (
    <div className="flex flex-col justify-start items-center gap-2">
      <LoadingButton loading={isFetching} disabled={isFetching} onClick={() => refetch()}>
        Refresh requests list
      </LoadingButton>
      {error && <pre>{error}</pre>}
      {data?.requests.length === 0 && <p>No pending requests found.</p>}
      {data &&
        data.requests.length > 0 &&
        data.requests.map((request) =>
          request ? <RepresentativeVerificationRequest key={request.user.uuid} request={request} /> : null
        )}
    </div>
  );
};

export default RepresentativeVerificationRequestsPage;
