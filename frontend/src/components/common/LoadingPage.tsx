import React from "react";
import LoadingSpinner from "../uilib/LoadingSpinner";

export default function LoadingPage() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-2">
      <LoadingSpinner size="h-10 w-10" />
    </div>
  );
}
