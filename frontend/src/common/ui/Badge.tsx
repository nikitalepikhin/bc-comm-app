interface Props {
  children: string;
}

export default function Badge(props: Props) {
  const { children } = props;
  return <div className="uppercase bg-secondary rounded-md px-2 py-0.5 text-white text-xs">{children}</div>;
}
