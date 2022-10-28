import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

export default function Portal(props: Props) {
  const { children } = props;
  const portal = document.getElementById("portal");

  return portal ? createPortal(children, portal) : null;
}
