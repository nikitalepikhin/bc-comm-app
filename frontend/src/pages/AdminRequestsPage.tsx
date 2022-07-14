import React from "react";
import AdminRequestCard from "../features/admin-requests/AdminRequestCard";

const AdminRequestsPage: React.FC = () => {
  return (
    <div className="mx-6 my-2 flex flex-col justify-start items-center gap-2">
      <button className="px-4 py-1.5 text-white bg-blue-600 hover:bg-blue-800 rounded-md w-fit">
        Refresh requests
      </button>
      <AdminRequestCard />
      <AdminRequestCard />
      <AdminRequestCard />
      <AdminRequestCard />
    </div>
  );
};

export default AdminRequestsPage;
