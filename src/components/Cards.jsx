export default function Cards({
  title,
  icon,
  description,
  className = "",
  children,
}) {
  return (
    <div
      className={`flex flex-col gap-2 p-3 rounded-2xl border shadow-md border-gray-300 ${className}`}
    >
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon && (
          <span className="p-2 rounded-full bg-white/20 text-xl">{icon}</span>
        )}
      </div>
      {children}
      {description && (
        <p className={`text-sm text-opacity-80  ${className}`}>{description}</p>
      )}
    </div>
  );
}
