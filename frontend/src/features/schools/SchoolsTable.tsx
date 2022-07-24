import React from "react";
import { SchoolResponseDto } from "../../app/api";

interface SchoolsTablePropsType {
  data: SchoolResponseDto[];
  loading: boolean;
}

const SchoolsTable: React.FC<SchoolsTablePropsType> = ({ data, loading }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>UUID</th>
            <th>Name</th>
            <th>Country Code</th>
            <th>City</th>
            <th>Address Line 1</th>
            <th>Address Line 2</th>
            <th>Postal Code</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && !loading ? (
            data.map((school) => (
              <tr key={school.uuid}>
                <td>{school.uuid}</td>
                <td>{school.name}</td>
                <td>{school.countryCode}</td>
                <td>{school.city}</td>
                <td>{school.addressLineOne}</td>
                <td>{school.addressLineTwo}</td>
                <td>{school.postalCode}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={100}>No schools found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default SchoolsTable;
