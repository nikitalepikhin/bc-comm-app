import PageWrapper from "../uilib/PageWrapper";
import { useGetTeacherByUsernameQuery } from "../../app/enhancedApi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../uilib/LoadingSpinner";
import Alert from "../uilib/Alert";
import Box from "../uilib/Box";
import { isNil } from "lodash";
import { UserIcon } from "@heroicons/react/24/outline";
import ErrorPage from "../common/ErrorPage";

export default function TeacherProfilePage() {
  const { username } = useParams() as { username: string };
  const { data, isLoading, isError, error } = useGetTeacherByUsernameQuery({ username });

  if (isError && error !== undefined && "status" in error && error.status === 404) {
    return <ErrorPage message="This teacher does not exist." />;
  }

  return (
    <PageWrapper>
      {isLoading && <LoadingSpinner />}
      <Alert show={isError} fullWidth>
        Error loading the teacher profile. Please try again.
      </Alert>
      {data && (
        <Box className="flex flex-col justify-start items-center w-full max-w-screen-md mx-auto">
          <div className="border-2 border-primary dark:border-white rounded-full p-2 mb-1">
            <UserIcon className="h-10 w-10" />
          </div>
          <div className="text-lg text-base">Teacher</div>
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-secondary dark:text-slate-400 text-sm">{data.username}</div>
          <div className="flex flex-col justify-start items-center w-full border-t border-slate-200 dark:border-slate-700 mt-2">
            <div className="mt-2">School & Faculty</div>
            <div className="text-secondary dark:text-slate-400">{`${data.school} - ${data.faculty}`}</div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 w-full">
            <div className="w-full text-center">Bio</div>
            {!isNil(data.bio) && data.bio.length > 0 ? (
              <div className="text-center text-secondary dark:text-slate-400">{data.bio}</div>
            ) : (
              <div className="text-center">Bio is empty</div>
            )}
          </div>
        </Box>
      )}
    </PageWrapper>
  );
}
