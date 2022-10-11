import React, { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  danger?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: string;
}

export default function DropdownButton(props: Props) {
  const { children, icon, iconPosition = "left", danger = false, type = "button", onClick } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames("px-3 py-2 cursor-pointer w-full", "flex flex-row justify-start items-center gap-1", {
        "text-red-600": danger,
      })}
    >
      {icon && iconPosition === "left" && <div className="my-auto">{icon}</div>}
      <div>{children}</div>
      {icon && iconPosition === "right" && <div className="my-auto">{icon}</div>}
    </button>
  );
}
