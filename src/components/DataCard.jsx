import { IoPencil, IoTrash } from "react-icons/io5";

export default function DataCard({
  title,
  icon,
  description,
  className = "",
  children,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className={`flex flex-col gap-2 p-3 rounded-2xl border border-gray-300 shadow-md ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold min-w-0 truncate">{title}</h3>
        {icon && (
          <span className="shrink-0 p-2 rounded-full bg-white/20 text-xl">
            {icon}
          </span>
        )}
      </div>

      {description && (
        <p className="text-sm text-gray-600 line-clamp-2 wrap-break">
          {description}
        </p>
      )}

      {children}

      {(onEdit || onDelete) && (
        <div className="flex justify-end gap-2 mt-2">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              aria-label="Edit"
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <IoPencil />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              aria-label="Delete"
              className="p-2 rounded-full text-red-600 hover:bg-red-50"
            >
              <IoTrash />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
