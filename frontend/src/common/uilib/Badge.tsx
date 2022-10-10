import classNames from "classnames";

interface Props {
  children: string;
}

export default function Badge(props: Props) {
  const { children } = props;
  return (
    <div
      className={classNames(
        "uppercase text-xs",
        "rounded-md w-fit px-2 py-0.5",
        "bg-slate-300/50 dark:bg-slate-500/50"
      )}
    >
      {children}
    </div>
  );
}
