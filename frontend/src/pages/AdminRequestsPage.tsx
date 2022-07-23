import React from "react";
import AdminRequestCard from "../features/admin-requests/AdminRequestCard";
import { useGetRepresentativeVerificationRequestsQuery } from "../app/enhancedApi";
import LoadingButton from "../common/LoadingButton";

const AdminRequestsPage: React.FC = () => {
  const { data, isFetching, error, refetch } = useGetRepresentativeVerificationRequestsQuery();
  return (
    <div className="mx-6 my-2 flex flex-col justify-start items-center gap-2">
      <LoadingButton
        loading={isFetching}
        disabled={isFetching}
        className="px-4 py-1.5 text-white bg-blue-600 hover:bg-blue-800 rounded-md w-fit"
        onClick={() => refetch()}
      >
        Refresh requests list
      </LoadingButton>
      {error && <pre>{error}</pre>}
      {data?.requests.length === 0 && <p>No pending requests found.</p>}
      {data &&
        data.requests.length > 0 &&
        data.requests.map((request) =>
          request ? <AdminRequestCard key={request.user.uuid} request={request} /> : null
        )}
    </div>
  );
};

export default AdminRequestsPage;
