import React from "react";
import { SchoolResponseDto } from "../../app/api";
import SchoolsTableRow from "./SchoolsTableRow";
import LoadingSpinner from "../../common/uilib/LoadingSpinner";

interface SchoolsTablePropsType {
  data: SchoolResponseDto[];
  loading: boolean;
}

const SchoolsTable: React.FC<SchoolsTablePropsType> = ({ data, loading }) => {
  return (
    <div className="overflow-auto w-full flex flex-row text-sm md:text-base bg-white shadow">
      <table className="w-full">
        <thead className="bg-white">
          <tr>
            <th className="border-b-secondary px-3 py-1">School UUID</th>
            <th className="border-b-secondary px-3 py-1">Name</th>
            <th className="border-b-secondary px-3 py-1 w-10">Country</th>
            <th className="border-b-secondary px-3 py-1 w-50">City</th>
            <th className="border-b-secondary px-3 py-1 w-50">Address Line 1</th>
            <th className="border-b-secondary px-3 py-1 w-50">Address Line 2</th>
            <th className="border-b-secondary px-3 py-1 w-30">Postal Code</th>
            <th className="border-b-secondary px-3 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && !loading ? (
            data.map((school) => <SchoolsTableRow key={school.uuid} school={school} />)
          ) : (
            <tr>
              <td colSpan={100} className="text-center px-4 py-2">
                {loading ? (
                  <div className="w-full flex flex-row justify-center items-center py-20">
                    <LoadingSpinner size="h-10 w-10" />
                  </div>
                ) : (
                  "No schools found"
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolsTable;
