import { IoSearch } from "react-icons/io5";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:w-1/2 md:w-1/3">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search..."
        className="w-full h-10 pl-4 pr-10 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-300"
      />
      <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-500 pointer-events-none" />
    </div>
  );
}
