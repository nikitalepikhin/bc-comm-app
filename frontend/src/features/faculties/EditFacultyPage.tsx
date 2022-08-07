import React from "react";
import { useParams } from "react-router-dom";

const EditFacultyPage: React.FC = () => {
  const { schoolUuid, facultyUuid } = useParams();
  return (
    <div>
      edit faculty {facultyUuid} for school {schoolUuid}
    </div>
  );
};

export default EditFacultyPage;
