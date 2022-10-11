import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper(props: Props) {
  const { children, className } = props;
  return <div className={classNames("py-3", { [`${className}`]: className })}>{children}</div>;
}
