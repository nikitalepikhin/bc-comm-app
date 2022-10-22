import React, { useState } from "react";
import { SchoolResponseDto } from "../../../app/api";
import { useDeleteSchoolMutation } from "../../../app/enhancedApi";
import { Link } from "react-router-dom";
import Button from "../../../common/uilib/Button";

interface SchoolsTableRowPropsType {
  school: SchoolResponseDto;
}

const SchoolsTableRow: React.FC<SchoolsTableRowPropsType> = ({ school }) => {
  const [deleteSchool] = useDeleteSchoolMutation();

  const [deleteInProgress, setDeleteInProgress] = useState(false);

  return (
    <tr key={school.uuid} className="odd:bg-gray-50 even:bg-white h-fit">
      <td className="px-3 py-1 font-mono leading-loose">
        <span className="bg-accent-light bg-opacity-50 rounded-md px-3 py-1">{school.uuid}</span>
      </td>
      <td className="px-3 py-1">{school.name}</td>
      <td className="px-3 py-1">{school.countryCode}</td>
      <td className="px-3 py-1">{school.city}</td>
      <td className="px-3 py-1">{school.addressLineOne}</td>
      <td className="px-3 py-1">{school.addressLineTwo}</td>
      <td className="px-3 py-1">{school.postalCode}</td>
      <td className="px-3 py-1">
        <div className="flex flex-col justify-center items-center gap-2">
          {deleteInProgress && (
            <div className="text-center text-red font-bold">
              <span>This cannot be undone!</span>
            </div>
          )}
          <div className="flex flex-row gap-2 justify-center items-center w-full">
            {!deleteInProgress && (
              <Link
                to={`/faculties/${school.uuid}`}
                className="bg-accent hover:bg-accent-strong text-white px-3 py-1 rounded-md"
              >
                Faculties
              </Link>
            )}
            {!deleteInProgress && (
              <Link
                to={`/schools/edit/${school.uuid}`}
                className="bg-accent hover:bg-accent-strong text-white px-3 py-1 rounded-md"
              >
                Edit
              </Link>
            )}
            <Button
              type="button"
              onClick={async () => {
                if (!deleteInProgress) {
                  setDeleteInProgress(true);
                } else {
                  await deleteSchool({ deleteSchoolDto: { uuid: school.uuid } });
                  setDeleteInProgress(false);
                }
              }}
              className="px-3 py-0.5 bg-red hover:bg-red-strong border-red hover:border-red-strong"
            >
              Delete
            </Button>
            {deleteInProgress && (
              <Button type="button" className="px-3 py-0.5" onClick={() => setDeleteInProgress(false)}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default SchoolsTableRow;
