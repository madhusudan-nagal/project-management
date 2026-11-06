export default function Cards({
  title,
  description,
  className = "",
  children,
}) {
  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-2xl border shadow-md border-gray-300 ${className}`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-gray-700">{description}</p>}
      {children}
    </div>
  );
}
