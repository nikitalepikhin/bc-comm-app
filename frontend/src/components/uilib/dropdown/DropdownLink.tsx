import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  children: string;
  to: string;
  textSmall: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  danger?: boolean;
}

export default function DropdownLink(props: Props) {
  const { children, to, icon, iconPosition = "left", danger = false, textSmall } = props;
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(to)}>
      <div
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
      </div>
    </button>
  );
}
