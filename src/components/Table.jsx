export default function Table({ data, columns }) {
  const tableCss = "w-full text-left  text-gray-700 rounded-2xl";
  const tableHeaderCss =
    "sticky top-0 z-10 px-4 py-2 text-left text-xs text-gray-700 bg-gray-200 font-semibold";
  const tableCellCss = " text-xs px-4 py-4 border-b border-gray-300";

  return (
    <div className="max-h-112.5 overflow-x-auto rounded-2xl border shadow-md border-gray-300 mt-4">
      <table className={tableCss}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={tableHeaderCss}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((project, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key} className={tableCellCss}>
                  <span
                    className={
                      typeof column.className === "function"
                        ? column.className(project[column.key])
                        : column.className || ""
                    }
                  >
                    {project[column.key]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
