import { IoAddCircle, IoPencil, IoTrash } from "react-icons/io5";

export default function Button({ iconType, label }) {
  const icons = {
    add: <IoAddCircle className="text-xl" />,
    edit: <IoPencil className="text-xl" />,
    delete: <IoTrash className="text-xl" />,
  };

  return (
    <button
      className={`flex flex-row gap-2 text-[0.600rem] items-center rounded-xl px-2 bg-linear-to-r bg-black text-white hover:from-black hover:to-gray-600 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 active:translate-y-0 active:shadow-md transition-all duration-300 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`}
    >
      {icons[iconType]}
      {label}
    </button>
  );
}
