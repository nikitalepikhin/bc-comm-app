import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
}

export default function PageWrapper(props: Props) {
  const { children } = props;
  return <div className={classNames("py-3")}>{children}</div>;
}
