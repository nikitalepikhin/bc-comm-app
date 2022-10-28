import classNames from "classnames";

interface Props {
  children: string;
  extra?: string;
}

export default function Badge(props: Props) {
  const { children, extra } = props;
  return (
    <div
      className={classNames(
        "group relative",
        "rounded-md w-fit px-2 py-0.5 text-xs",
        "bg-slate-300/50 dark:bg-slate-500/50",
        "flex flex-row justify-between items-center gap-1"
      )}
    >
      <div className={classNames("uppercase")}>{children}</div>
      {extra && <div className={classNames("lg:hidden lg:group-hover:block")}>{extra}</div>}
    </div>
  );
}
