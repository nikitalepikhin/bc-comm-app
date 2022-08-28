import React from "react";
import { FacultyResponseDto } from "../../app/api";
import FacultiesTableRow from "./FacultiesTableRow";
import LoadingSpinner from "../../common/ui/LoadingSpinner";

interface FacultiesTablePropsType {
  data: FacultyResponseDto[];
  loading: boolean;
}

const FacultiesTable: React.FC<FacultiesTablePropsType> = ({ data, loading }) => {
  return (
    <div className="overflow-auto w-full flex flex-row text-sm md:text-base">
      <table className="w-full border border-gray-200">
        <thead className="bg-white border-gray-200 bg-gray-200">
          <tr>
            <th className="px-3 py-1">Faculty UUID</th>
            <th className="px-3 py-1">Name</th>
            <th className="px-3 py-1 w-10">Country</th>
            <th className="px-3 py-1 w-50">City</th>
            <th className="px-3 py-1 w-50">Address Line 1</th>
            <th className="px-3 py-1 w-50">Address Line 2</th>
            <th className="px-3 py-1 w-30">Postal Code</th>
            <th className="px-3 py-1">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length > 0 && !loading ? (
            data.map((faculty) => <FacultiesTableRow key={faculty.uuid} faculty={faculty} />)
          ) : (
            <tr>
              <td colSpan={100} className="text-center px-4 py-2">
                {loading ? (
                  <div className="w-full flex flex-row justify-center items-center py-20">
                    <LoadingSpinner size="h-10 w-10" />
                  </div>
                ) : (
                  "No faculties found"
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FacultiesTable;
