import { Popover as HeadlessPopover } from "@headlessui/react";
import { createContext, ElementType, ReactNode } from "react";
import classNames from "classnames";

interface Props {
  content: ReactNode;
  button: ReactNode;
  buttonAs: ElementType;
  onClick?: () => void;
  className?: string;
}

interface PopoverContextType {
  close: () => void;
}
export const PopoverContext = createContext<PopoverContextType>({ close: () => {} });

export default function Popover(props: Props) {
  const { content, button, buttonAs, onClick, className } = props;

  return (
    <HeadlessPopover className="relative">
      {({ close }) => (
        <PopoverContext.Provider value={{ close }}>
          <HeadlessPopover.Button as={buttonAs} onClick={onClick}>
            {button}
          </HeadlessPopover.Button>
          <HeadlessPopover.Panel
            as="div"
            className={classNames(
              "absolute top-12 z-10",
              "bg-slate-50 dark:bg-slate-900 drop-shadow",
              "border border-slate-200 dark:border-slate-700",
              "rounded-md p-3 mx-2 mb-2 max-h-[92vh] md:max-h-[70vh]",
              "break-words",
              "overflow-y-auto",
              { [`${className}`]: className }
            )}
          >
            {content}
          </HeadlessPopover.Panel>
        </PopoverContext.Provider>
      )}
    </HeadlessPopover>
  );
}
