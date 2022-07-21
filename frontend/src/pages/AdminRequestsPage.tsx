import React from "react";
import AdminRequestCard from "../features/admin-requests/AdminRequestCard";
import { useGetRepresentativeVerificationRequestsQuery } from "../app/enhancedApi";
import { CircularProgress } from "@mui/material";
import LoadingButton from "../common/LoadingButton";

const AdminRequestsPage: React.FC = () => {
  const { data, isFetching, isUninitialized, error, refetch } = useGetRepresentativeVerificationRequestsQuery();
  return (
    <div className="mx-6 my-2 flex flex-col justify-start items-center gap-2">
      <div className="w-2/5">
        <LoadingButton
          loading={isFetching}
          className="px-4 py-1.5 text-white bg-blue-600 hover:bg-blue-800 rounded-md min-w-fit w-full"
          onClick={() => refetch()}
          loadingIconSize={18}
        >
          Refresh requests list
        </LoadingButton>
      </div>
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
