import { Link } from "react-router-dom";
import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  children: string;
  to: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  danger?: boolean;
}

export default function DropdownLink(props: Props) {
  const { children, to, icon, iconPosition = "left", danger = false } = props;

  return (
    <Link to={to}>
      <div
        className={classNames("px-3 py-2 cursor-pointer w-full", "flex flex-row justify-start items-center gap-1", {
          "text-red-600": danger,
        })}
      >
        {icon && iconPosition === "left" && <div className="my-auto">{icon}</div>}
        <div>{children}</div>
        {icon && iconPosition === "right" && <div className="my-auto">{icon}</div>}
      </div>
    </Link>
  );
}
