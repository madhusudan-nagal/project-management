export default function Cards({
  title,
  icon,
  description,
  className = "",
  children,
}) {
  return (
    <div
      className={`flex flex-col gap-2 p-3 rounded-2xl border border-gray-300 shadow-md ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon && (
          <span className="shrink-0 p-2 rounded-full bg-white/20 text-xl">
            {icon}
          </span>
        )}
      </div>
      {children}
      {description && <p className="text-sm opacity-80">{description}</p>}
    </div>
  );
}
