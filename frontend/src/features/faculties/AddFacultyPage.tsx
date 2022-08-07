import React from "react";
import { useParams } from "react-router-dom";

const AddFacultyPage: React.FC = () => {
  const { schoolUuid } = useParams();
  return <div>add faculty for uni {schoolUuid}</div>;
};

export default AddFacultyPage;
