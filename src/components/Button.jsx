import { IoAddCircle, IoPencil, IoTrash } from "react-icons/io5";

export default function Button({ iconType, label , onClick}) {
  const icons = {
    add: <IoAddCircle className="text-xl" />,
    edit: <IoPencil className="text-xl" />,
    delete: <IoTrash className="text-xl" />,
  };

  return (
    <button 
      className={`flex flex-row gap-2 text-[0.600rem] items-center rounded-xl px-2 bg-linear-to-r bg-blue-500 text-white hover:from-blue hover:to-blue-600 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 `}
    onClick={onClick}>
      {icons[iconType]}
      {label}
    </button>
  );
}
