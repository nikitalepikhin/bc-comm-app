import React from "react";
import { FacultyResponseDto } from "../../app/api";

interface SchoolsTableRowPropsType {
  faculty: FacultyResponseDto;
}

const FacultiesTableRow: React.FC<SchoolsTableRowPropsType> = ({ faculty }) => {
  // const [deleteSchool] = useDeleteSchoolMutation();

  // const [deleteInProgress, setDeleteInProgress] = useState(false);

  return (
    <tr key={faculty.uuid} className="odd:bg-gray-50 even:bg-white h-fit">
      <td className="px-3 py-1 font-mono leading-loose">
        <span className="bg-yellow-200 bg-opacity-50 rounded-md px-3 py-1">{faculty.uuid}</span>
      </td>
      <td className="px-3 py-1">{faculty.name}</td>
      <td className="px-3 py-1">{faculty.countryCode}</td>
      <td className="px-3 py-1">{faculty.city}</td>
      <td className="px-3 py-1">{faculty.addressLineOne}</td>
      <td className="px-3 py-1">{faculty.addressLineTwo}</td>
      <td className="px-3 py-1">{faculty.postalCode}</td>
      <td className="px-3 py-1">
        <div className="flex flex-col justify-center items-center gap-2">
          {/*{deleteInProgress && (*/}
          {/*  <div className="text-center text-red-600 font-bold">*/}
          {/*    <span>This cannot be undone!</span>*/}
          {/*  </div>*/}
          {/*)}*/}
          {/*<div className="flex flex-row gap-2 justify-center items-center w-full">*/}
          {/*  {!deleteInProgress && (*/}
          {/*    <Link*/}
          {/*      to={`/schools/edit/${school.uuid}`}*/}
          {/*      className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded-md"*/}
          {/*    >*/}
          {/*      Edit*/}
          {/*    </Link>*/}
          {/*  )}*/}
          {/*  <button*/}
          {/*    type="button"*/}
          {/*    onClick={async () => {*/}
          {/*      if (!deleteInProgress) {*/}
          {/*        setDeleteInProgress(true);*/}
          {/*      } else {*/}
          {/*        await deleteSchool({ deleteSchoolDto: { uuid: school.uuid } });*/}
          {/*        setDeleteInProgress(false);*/}
          {/*      }*/}
          {/*    }}*/}
          {/*    className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded-md"*/}
          {/*  >*/}
          {/*    Delete*/}
          {/*  </button>*/}
          {/*  {deleteInProgress && (*/}
          {/*    <button*/}
          {/*      type="button"*/}
          {/*      className="bg-gray-400 hover:bg-gray-600 text-white px-3 py-1 rounded-md"*/}
          {/*      onClick={() => setDeleteInProgress(false)}*/}
          {/*    >*/}
          {/*      Cancel*/}
          {/*    </button>*/}
          {/*  )}*/}
          {/*</div>*/}
        </div>
      </td>
    </tr>
  );
};

export default FacultiesTableRow;
