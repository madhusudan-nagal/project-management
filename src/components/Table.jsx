import { useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";

export default function Table({ data, columns, onEdit, onDelete }) {
  const tableHeaderCss = "sticky top-0 z-10 px-4 py-2 text-left text-xs text-gray-700 bg-gray-200 font-semibold";
  const tableCellCss = "text-xs px-4 py-4 border-b border-gray-300";

  const [filters, setFilters] = useState({});

  const filteredData = data.filter((row) =>
    Object.entries(filters).every(([key, value]) => !value || row[key] === value),
  );

  return (
    <div className="max-h-112.5 overflow-auto rounded-2xl border shadow-md border-gray-300 mt-4">
      <table className="w-full text-left text-gray-700">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={tableHeaderCss}>
                {column.filterOptions ? (
                  <select
                    value={filters[column.key] || ""}
                    onChange={(e) => setFilters({ ...filters, [column.key]: e.target.value })}
                    className="bg-transparent font-semibold text-xs cursor-pointer focus:outline-none"
                  >
                    <option value="">{column.title}: All</option>
                    {column.filterOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  column.title
                )}
              </th>
            ))}
            {onEdit && <th className={tableHeaderCss}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="text-center text-xs py-6 text-gray-400">
                No results found
              </td>
            </tr>
          )}
          {filteredData.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key} className={tableCellCss}>
                  {column.render ? (
                    column.render(row)
                  ) : (
                    <span className={typeof column.className === "function" ? column.className(row[column.key]) : column.className || ""}>
                      {row[column.key]}
                    </span>
                  )}
                </td>
              ))}
              {onEdit && (
                <td className={tableCellCss}>
                  <div className="flex gap-3">
                    <button onClick={() => onEdit(row)}>
                      <IoPencil className="text-lg text-blue-500 hover:text-blue-700" />
                    </button>
                    <button onClick={() => onDelete(row)}>
                      <IoTrash className="text-lg text-red-500 hover:text-red-700" />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}