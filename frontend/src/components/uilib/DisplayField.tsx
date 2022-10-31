interface Props {
  data: string | undefined;
  labelValue?: string;
}

export default function DisplayField(props: Props) {
  const { data, labelValue } = props;

  return data ? (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      {labelValue && <div className="text-secondary dark:text-slate-400">{labelValue}</div>}
      <div>{data}</div>
    </div>
  ) : null;
}
