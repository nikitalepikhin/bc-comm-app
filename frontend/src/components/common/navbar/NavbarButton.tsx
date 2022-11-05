import { ForwardedRef, forwardRef, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
  hello?: string;
}

function NavbarButton(props: Props, ref: ForwardedRef<HTMLButtonElement>) {
  const { children, onClick, className } = props;

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={classNames(
        "w-fit p-2 rounded-md",
        "text-primary dark:text-white hover:text-slate-700 hover:dark:text-slate-200",
        "border border-transparent",
        "hover:border-slate-200 dark:hover:border-slate-700",
        "focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none focus:ring-blue-600/50",
        "flex flex-row justify-center items-center gap-1",
        className
      )}
    >
      {children}
    </button>
  );
}

export default forwardRef(NavbarButton);
