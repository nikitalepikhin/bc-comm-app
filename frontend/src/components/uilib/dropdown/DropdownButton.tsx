import React, { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: string;
  textSmall: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  danger?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function DropdownButton(props: Props) {
  const { children, icon, iconPosition = "left", danger = false, type = "button", onClick, textSmall } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        "cursor-pointer w-full",
        "flex flex-row justify-start items-center gap-1.5",
        {
          "text-red-600": danger,
        },
        { "text-sm px-2 py-1.5": textSmall },
        { "px-3 py-2": !textSmall }
      )}
    >
      {icon && iconPosition === "left" && <div className="my-auto">{icon}</div>}
      <div>{children}</div>
      {icon && iconPosition === "right" && <div className="my-auto">{icon}</div>}
    </button>
  );
}
