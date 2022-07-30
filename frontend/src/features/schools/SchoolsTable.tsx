import React from "react";
import { SchoolResponseDto } from "../../app/api";
import SchoolsTableRow from "./SchoolsTableRow";

interface SchoolsTablePropsType {
  data: SchoolResponseDto[];
  loading: boolean;
}

const SchoolsTable: React.FC<SchoolsTablePropsType> = ({ data, loading }) => {
  return (
    <div className="overflow-auto w-full flex flex-row text-sm md:text-base">
      <table className="w-full border border-gray-200">
        <thead className="bg-white border-gray-200 bg-gray-200">
          <tr>
            <th className="px-3 py-1">UUID</th>
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
            data.map((school) => <SchoolsTableRow key={school.uuid} school={school} />)
          ) : (
            <tr>
              <td colSpan={100} className="text-center px-4 py-2">
                No schools found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolsTable;
