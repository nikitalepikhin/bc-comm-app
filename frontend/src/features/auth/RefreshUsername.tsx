import classNames from "classnames";
import { useAppSelector } from "../../app/hooks";
import Button from "../../common/uilib/Button";
import { useLazyRefreshUsernameQuery } from "../../app/enhancedApi";

export default function RefreshUsername() {
  const { username } = useAppSelector((state) => state.auth.user);
  const [refreshUsername, { isFetching }] = useLazyRefreshUsernameQuery();

  return (
    <div
      className={classNames(
        "flex flex-col justify-start items-start gap-2",
        "border-b border-slate-200 dark:border-slate-700",
        "pb-2"
      )}
    >
      <div className="text-lg font-bold">Refresh Username</div>
      <div className="flex flex-row justify-between items-start gap-2 flex-wrap w-full">
        <div>
          Current Username:
          <span className="text-secondary dark:text-slate-400 ml-1">{isFetching ? "Loading... " : username}</span>
        </div>
        <Button
          variant="accent"
          type="button"
          loading={isFetching}
          onClick={() => {
            refreshUsername();
          }}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}
