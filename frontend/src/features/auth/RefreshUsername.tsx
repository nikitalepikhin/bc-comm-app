import classNames from "classnames";
import { useAppSelector } from "../../app/hooks";
import Button from "../../common/uilib/Button";

export default function RefreshUsername() {
  const { username } = useAppSelector((state) => state.auth.user);

  return (
    <div className={classNames("flex flex-col justify-start items-start gap-2", "pt-2")}>
      <div className="text-lg font-bold">Refresh Username</div>
      <div className="flex flex-row justify-between items-start gap-2 flex-wrap w-full">
        <div>
          Current Username:<span className="text-secondary dark:text-slate-400 ml-1">{username}</span>
        </div>
        <Button variant="accent" type="button" onClick={() => {}}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
