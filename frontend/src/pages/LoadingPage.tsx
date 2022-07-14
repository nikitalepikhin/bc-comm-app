import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingPage: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-2">
      <CircularProgress variant="indeterminate" />
    </div>
  );
};

export default LoadingPage;
