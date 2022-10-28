import classNames from "classnames";
import { useAppSelector } from "../../app/redux/hooks";
import Button from "../uilib/Button";
import { useRefreshUsernameMutation } from "../../app/enhancedApi";
import Alert from "../uilib/Alert";

export default function RefreshUsername() {
  const { username } = useAppSelector((state) => state.auth.user);
  const [refreshUsername, { isLoading, isSuccess, isError, reset }] = useRefreshUsernameMutation();

  return (
    <div
      className={classNames(
        "flex flex-col justify-start items-start gap-2",
        "border-b border-slate-200 dark:border-slate-700",
        "pb-2"
      )}
    >
      <div className="text-lg font-bold">Refresh Username</div>
      <div className="flex flex-row justify-between items-center gap-2 flex-wrap w-full">
        <div className="flex flex-col justify-start items-start gap-1 flex-wrap">
          <div>Current Username:</div>
          <div className="text-secondary dark:text-slate-400">{isLoading ? "Loading... " : username}</div>
        </div>
        <Button
          variant="accent"
          type="button"
          loading={isLoading}
          onClick={() => {
            refreshUsername();
          }}
        >
          Refresh
        </Button>
      </div>
      <Alert show={isError} fullWidth onClose={() => reset()}>
        Error refreshing the username. Please try again.
      </Alert>
      <Alert show={isSuccess} fullWidth severity="success" onClose={() => reset()}>
        Username has been successfully refreshed.
      </Alert>
      <Alert show fullWidth severity="info">
        Refreshing the username will ensure all newly created posts and comments are marked with your new username.
        Previously created posts and comments will not be updated.
      </Alert>
    </div>
  );
}
