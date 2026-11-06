import { IoAddCircle, IoPencil, IoTrash } from "react-icons/io5";

export default function Button({ iconType, label, className }) {
  const icons = {
    add: <IoAddCircle className="text-2xl" />,
    edit: <IoPencil className="text-2xl" />,
    delete: <IoTrash className="text-2xl" />,
  };

  return (
    <button
      className={`flex flex-row gap-2 text-[0.800rem] items-center rounded-2xl px-4 py-2 ${className}`}
    >
      {icons[iconType]}
      {label}
    </button>
  );
}
