import classNames from "classnames";

interface Props {
  data: string | undefined;
  labelValue?: string;
}

export default function DisplayField(props: Props) {
  const { data, labelValue } = props;

  return data ? (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      {labelValue && <div>{labelValue}</div>}
      <div className={classNames({ "text-secondary dark:text-slate-400": labelValue })}>{data}</div>
    </div>
  ) : null;
}
