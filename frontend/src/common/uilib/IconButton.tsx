import React, { ReactNode } from "react";

interface Props {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}

export default function IconButton(props: Props) {
  const { disabled, onClick, children, className } = props;
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
