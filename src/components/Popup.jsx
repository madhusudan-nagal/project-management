import { useState } from "react";

const inputCss =
  "w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-300";

export default function Popup({
  mode,
  item,
  fields,
  title,
  onSave,
  onDelete,
  onClose,
}) {
  const [values, setValues] = useState(item || {});

  if (!mode) return null; // nothing open

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(values);
  };

  const heading =
    { add: "Add", edit: "Edit", delete: "Delete" }[mode] + " " + title;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-5 bg-white rounded-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-semibold">{heading}</h2>

        {mode === "delete" ? (
          /* ---------- Delete view ---------- */
          <>
            <p className="mb-4 text-sm text-gray-600">
              Delete "{item?.name || item?.title}"? This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1 text-xs rounded-xl border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-1 text-xs rounded-xl bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          /* ---------- Add / Edit view ---------- */
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {fields.map((field) => (
              <label
                key={field.name}
                className="flex flex-col gap-1 text-xs font-semibold text-gray-700"
              >
                {field.label}
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={values[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    className={inputCss}
                  >
                    <option value="">Select...</option>
                    {field.options.map((opt) => {
                      const value = typeof opt === "object" ? opt.value : opt;
                      const label = typeof opt === "object" ? opt.label : opt;
                      return (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={values[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    className={inputCss}
                  />
                )}
              </label>
            ))}
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 text-xs rounded-xl border border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-xs rounded-xl bg-black text-white"
              >
                {mode === "edit" ? "Update" : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
