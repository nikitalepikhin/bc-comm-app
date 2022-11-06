import { Tab } from "@headlessui/react";
import { Fragment, ReactElement } from "react";
import classNames from "classnames";

interface TabItem {
  name: string;
  render?: boolean;
  element: ReactElement;
  onClick?: () => void;
}

interface Props {
  tabItems: TabItem[];
}

export default function Tabs(props: Props) {
  const { tabItems } = props;
  return (
    <Tab.Group as={Fragment}>
      <Tab.List
        as="div"
        className={classNames(
          "w-full rounded-md overflow-auto",
          "flex justify-between items-center",
          "border border-slate-200 dark:border-slate-700",
          { hidden: tabItems.length === 0 },
          { "flex-col md:flex-row": tabItems.length > 3 },
          { "flex-row": tabItems.length <= 3 }
        )}
      >
        {tabItems.map((tab, index) =>
          tab.render === undefined || tab.render ? (
            <Tab as={Fragment} key={index}>
              {({ selected }) => (
                <div
                  className={classNames(
                    "w-full px-3 py-2 mx-auto",
                    "text-center truncate",
                    "border border-slate-200 dark:border-slate-700",
                    {
                      "border-y-0 border-x first:border-l-0 border-r-0 last:border-r-0": tabItems.length <= 3,
                    },
                    {
                      "md:border-y-0 md:first:border-l-0 md:border-r-0 md:last:border-r-0 border-x-0 first:border-t-0 border-b-0 last:border-b-0 md:border-x":
                        tabItems.length > 3,
                    },
                    { "bg-blue-100 dark:bg-blue-900": selected },
                    {
                      "text-slate-700 dark:text-slate-300 hover:bg-slate-100 hover:dark:bg-slate-700 bg-transparent":
                        !selected,
                    },
                    "active:outline-none selected:outline-none focus-visible:outline-none cursor-pointer"
                  )}
                >
                  {tab.name}
                </div>
              )}
            </Tab>
          ) : null
        )}
      </Tab.List>
      <Tab.Panels as="div" className="mt-2 w-full">
        {tabItems.map((tabItem, index) =>
          (tabItems[index] !== undefined && tabItems[index].render !== undefined && tabItems[index].render) ||
          (tabItems[index] !== undefined && tabItems[index].render === undefined) ? (
            <Tab.Panel key={index} as="div" onClick={tabItem.onClick}>
              {tabItem.element}
            </Tab.Panel>
          ) : null
        )}
      </Tab.Panels>
    </Tab.Group>
  );
}
