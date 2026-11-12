import {
  IoBarChart,
  IoFolder,
  IoFileTrayFull,
  IoLayers,
} from "react-icons/io5";
import { NavLink, Outlet } from "react-router";


const links = [
  { to: "/", label: "Dashboard", icon: <IoBarChart /> },
  { to: "/projects", label: "Projects", icon: <IoFolder /> },
  { to: "/tasks", label: "Tasks", icon: <IoFileTrayFull /> },
];

const iconCss =
  "group relative flex items-center justify-center h-14 w-14 rounded-2xl text-[#6a778e] transition-all hover:bg-blue-400 hover:text-white active:scale-90";

const activeCss = "bg-blue-600 text-white shadow-md";

const labelCss =
  "absolute left-full ml-4 z-10 -translate-x-12 opacity-0 pointer-events-none whitespace-nowrap rounded-2xl bg-white p-3 text-sm text-blue-700 shadow-md transition-all group-hover:opacity-100 group-hover:translate-x-0";

// NavLink tells us if the link is active (the current page)
const linkClass = ({ isActive }) => `${iconCss} ${isActive ? activeCss : ""}`;

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col gap-2 p-6 bg-gray-100 overflow-hidden">
      {/* Top navbar */}
      <nav className="p-4 rounded-2xl bg-linear-to-r from-[#406ff3] to-[#7090ea]">
        <h1 className="text-xl font-bold text-white">
          <IoLayers className="inline-block mr-2 text-4xl" />
          Project Management
        </h1>
      </nav>

      <div className="flex-1 min-h-0 flex gap-2">
       
        <aside className="w-1/12 flex flex-col gap-6 p-6 text-2xl bg-white border-2 border-gray-300 rounded-2xl">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={linkClass}
            >
              {link.icon}
              <span className={labelCss}>{link.label}</span>
            </NavLink>
          ))}
        </aside>

      
        <main className="w-11/12 p-4 bg-white border-2 border-gray-300 rounded-2xl overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
