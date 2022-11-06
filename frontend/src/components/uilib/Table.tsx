import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  columns: string[];
  rows: ReactNode[][];
}

export default function Table(props: Props) {
  const { columns, rows } = props;

  return (
    <div className={classNames("rounded-md overflow-auto", "shadow", "text-base")}>
      <table className={classNames("border border-slate-200 dark:border-slate-700", "w-full")}>
        <thead>
          <tr className={classNames("bg-slate-300 dark:bg-slate-900")}>
            {columns.map((column, index) => (
              <th
                key={`col-${index}`}
                className={classNames(
                  "px-3 py-2",
                  "border-r border-b last:border-r-0 border-slate-200 dark:border-slate-700",
                  "whitespace-nowrap"
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 &&
            rows.map((row, index) => (
              <tr
                key={`row-${index}`}
                className={classNames(
                  "odd:bg-slate-100 odd:dark:bg-slate-800/50 even:bg-white even:dark:bg-slate-800",
                  "border-b border-slate-200 dark:border-slate-700 last:border-b-0"
                )}
              >
                {row.map((cell, idx) => (
                  <td
                    key={`cell-${index}-${idx}`}
                    className={classNames(
                      "p-2",
                      "border-r last:border-r-0 border-slate-200 dark:border-slate-700",
                      "whitespace-nowrap"
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={100} className="text-center p-6">
                Table has no entries.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
