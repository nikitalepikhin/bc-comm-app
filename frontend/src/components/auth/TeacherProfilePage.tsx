import PageWrapper from "../uilib/PageWrapper";
import { useGetTeacherByUsernameQuery } from "../../app/enhancedApi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../uilib/LoadingSpinner";
import Alert from "../uilib/Alert";
import Box from "../uilib/Box";

export default function TeacherProfilePage() {
  const { username } = useParams() as { username: string };
  const { data, isLoading, isError } = useGetTeacherByUsernameQuery({ username });
  return (
    <PageWrapper>
      {isLoading && <LoadingSpinner />}
      <Alert show={isError} fullWidth>
        Error loading the teacher profile. Please try again.
      </Alert>
      {data && (
        <Box className="flex flex-col justify-start items-center w-full max-w-screen-md mx-auto">
          <div className="text-lg font-bold">
            <span className="font-normal mr-1">Teacher</span>
            <span>{data.name}</span>
          </div>
          <div className="text-secondary dark:text-slate-400">
            <span className="text-primary dark:text-white">{data.username}</span>
          </div>
          <div className="mt-2 font-bold">{`${data.school} - ${data.faculty}`}</div>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="font-bold w-full mx-auto text-center">Bio</div>
            <div>{data.bio}</div>
          </div>
        </Box>
      )}
    </PageWrapper>
  );
}
