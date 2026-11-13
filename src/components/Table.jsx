import { useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";

const headerCss =
  "sticky top-0 z-10 px-4 py-2 text-left text-xs text-gray-700 bg-gray-200 font-semibold";
const cellCss = "text-xs px-4 py-4 border-b border-gray-300 truncate";

export default function Table({ data, columns, onEdit, onDelete }) {
  // selected filter for each column, e.g. { status: "Completed" }
  const [filters, setFilters] = useState({});

  // save the selected filter for one column
  const handleFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  // keep a row only if it matches every selected filter
  const filteredData = data.filter((row) => {
    for (const key in filters) {
      if (filters[key] && row[key] !== filters[key]) return false;
    }
    return true;
  });

  return (
    <div className="max-h-112.5 overflow-auto mt-4 rounded-2xl border border-gray-300 shadow-md">
      <table className="w-full min-w-180 table-fixed text-left text-gray-700">
        {/* ---------- Header: column titles and filters ---------- */}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={headerCss}
                style={{ width: column.width }}
              >
                {column.filterOptions ? (
                  <select
                    value={filters[column.key] || ""}
                    onChange={(e) => handleFilter(column.key, e.target.value)}
                    className="bg-transparent text-xs font-semibold cursor-pointer focus:outline-none"
                  >
                    <option value="">{column.title}: All</option>
                    {column.filterOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  column.title
                )}
              </th>
            ))}
            <th className={headerCss} style={{ width: "90px" }}>
              Action
            </th>
          </tr>
        </thead>

        {/* ---------- Body: the data rows ---------- */}
        <tbody>
          {filteredData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="py-6 text-center text-xs text-gray-400"
              >
                No results found
              </td>
            </tr>
          )}

          {filteredData.map((row) => (
            <tr key={row.id}>
              {/* data cells: one per column */}
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cellCss}
                  title={row[column.key]}
                >
                  {column.render ? (
                    column.render(row)
                  ) : (
                    <span
                      className={
                        column.className
                          ? column.className(row[column.key])
                          : ""
                      }
                    >
                      {row[column.key]}
                    </span>
                  )}
                </td>
              ))}

              {/* action cell: one per row */}
              <td className={cellCss}>
                <div className="flex gap-3">
                  <button onClick={() => onEdit(row)}>
                    <IoPencil className="text-lg text-blue-500 hover:text-blue-700" />
                  </button>
                  <button onClick={() => onDelete(row)}>
                    <IoTrash className="text-lg text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
