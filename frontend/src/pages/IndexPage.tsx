import React from "react";

export const IndexPage: React.FC = () => {
  return (
    <div className="m-2">
      <p className="inline">WELCOME, PLEASE LOG IN </p>
      <a href="/login" className="text-blue-600 hover:underline hover:text-blue-800">
        HERE
      </a>
    </div>
  );
};
