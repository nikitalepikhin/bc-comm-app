import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";

type Error = FetchBaseQueryError | SerializedError;

export default function errorHasStatus(error: Error | undefined): boolean {
  if (error === undefined) return false;
  return "status" in error;
}
