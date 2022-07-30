import React from "react";
import { SchoolResponseDto } from "../../app/api";

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
            data.map((school) => (
              <tr key={school.uuid} className="odd:bg-gray-50 even:bg-white h-fit">
                <td className="px-3 py-1 font-mono leading-loose">
                  <span className="bg-yellow-200 bg-opacity-50 rounded-md px-3 py-1">{school.uuid}</span>
                </td>
                <td className="px-3 py-1">{school.name}</td>
                <td className="px-3 py-1">{school.countryCode}</td>
                <td className="px-3 py-1">{school.city}</td>
                <td className="px-3 py-1">{school.addressLineOne}</td>
                <td className="px-3 py-1">{school.addressLineTwo}</td>
                <td className="px-3 py-1">{school.postalCode}</td>
                <td className="px-3 py-1">
                  <div className="flex flex-row gap-2 justify-center items-center">
                    <button
                      onClick={() => {}}
                      className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button onClick={() => {}} className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded-md">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={100}>No schools found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolsTable;
