import React, { ReactNode } from "react";

interface Props {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export default function IconButton(props: Props) {
  const { disabled, onClick, children } = props;
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
