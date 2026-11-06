import {
  IoBarChart,
  IoFolder,
  IoFileTrayFull,
  IoLayers,
} from "react-icons/io5";
import { Link, Outlet } from "react-router";

const IconsCss =
  "rounded-2xl items-center flex flex-col gap-3 p-2  hover:bg-gray-200 transition-colors duration-300 cursor-pointer";

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col p-6 gap-2 bg-gray-100 overflow-hidden">
      <nav className="shrink-0 p-4 bg-linear-to-r from-gray-800 to-gray-600 rounded-2xl flex items-center justify-between">
        <div className="text-white font-bold font-sans text-xl">
          <IoLayers className="inline-block mr-2 text-4xl" />
          Project Management
        </div>
      </nav>

      <div className="flex-1 min-h-0 flex flex-row gap-2">
        <div className="w-1/12 rounded-2xl flex flex-col gap-6 p-6 text-2xl bg-white border-2 border-gray-300 ">
          <Link to="/" title="Dashboard" className={IconsCss}>
            <IoBarChart/>
          </Link>

          <Link to="/projects" title="Projects" className={IconsCss}>
            <IoFolder />
          </Link>

          <Link to="/tasks" title="Tasks" className={IconsCss}>
            <IoFileTrayFull />
          </Link>
        </div>

        <main className="w-11/12 p-4 bg-white border-2 border-gray-300 rounded-2xl overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
