import { IoSearch } from "react-icons/io5";

export default function SearchBar({ value, onChange, className }) {
  return (
    <div className="relative flex items-center w-1/3">
      <IoSearch className="cursor-pointer rounded-r-xl w-10 h-10 p-2 bg-gray-200 border-gray-300  border  absolute right-0 text-black" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search..."
        className={`flex-1 px-4 h-10 border border-gray-300 rounded-xl focus:outline-none 
                    focus:ring focus:border-blue-300 ${className}`}
      />
    </div>
  );
}
