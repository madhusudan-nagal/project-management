import {
  IoBarChart,
  IoFolder,
  IoFileTrayFull,
  IoLayers,
} from "react-icons/io5";
import { NavLink, Outlet } from "react-router";

const IconsCss =
  "group relative flex items-center justify-center h-14 w-14 rounded-[17.5px] text-[#6a778e] transition-all duration-250 ease-in-out hover:bg-blue-400 hover:text-white active:scale-90";

const activeCss = "bg-blue-600 text-white shadow-md";

const labelCss =
  "absolute left-full ml-4 z-10 -translate-x-12 opacity-0 pointer-events-none whitespace-nowrap rounded-[17.5px] bg-white p-3 text-sm text-blue-700 shadow-md transition-all duration-250 group-hover:opacity-100 group-hover:translate-x-0";

const linkClass = ({ isActive }) => `${IconsCss} ${isActive ? activeCss : ""}`;

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col p-6 gap-2 bg-gray-100 overflow-hidden">
      <nav className="shrink-0 p-4 bg-linear-to-r from-[#406ff3] to-[#7090ea] rounded-2xl flex items-center justify-between">
        <div className="text-white font-bold font-sans text-xl">
          <IoLayers className="inline-block mr-2 text-4xl" />
          Project Management
        </div>
      </nav>

      <div className="flex-1 min-h-0 flex flex-row gap-2">
        <div className="w-1/12 rounded-2xl flex flex-col gap-6 p-6 text-2xl bg-white border-2 border-gray-300">
          <NavLink to="/" end className={linkClass}>
            <IoBarChart />
            <span className={labelCss}>Dashboard</span>
          </NavLink>

          <NavLink to="/projects" className={linkClass}>
            <IoFolder />
            <span className={labelCss}>Projects</span>
          </NavLink>

          <NavLink to="/tasks" className={linkClass}>
            <IoFileTrayFull />
            <span className={labelCss}>Tasks</span>
          </NavLink>
        </div>

        <main className="w-11/12 p-4 bg-white border-2 border-gray-300 rounded-2xl overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
