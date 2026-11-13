import Cards from "../components/Cards";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import { IoFolderSharp, IoClipboardSharp, IoTime } from "react-icons/io5";
import { getData } from "../utils/api";
import { useState, useEffect } from "react";

// date format ----  changes "2026-11-20" into "20 Nov"
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getData("tasks").then(setTasks);
    getData("projects").then(setProjects);
  }, []);

  //projects
  const totalProjects = projects.length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed",
  ).length;
  const inProgressProjects = projects.filter(
    (p) => p.status === "In Progress",
  ).length;

  //task
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "In Progress",
  ).length;
  const plannedTasks = tasks.filter((t) => t.status === "Planned").length;

  const pendingTasks = tasks
    .filter((t) => t.status !== "Completed")
    .sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""));
  const nextDue = pendingTasks[0];

  const projectNames = projects.map((p) => p.name);
  const projectProgress = projects.map((p) => p.progress);

    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:h-full md:grid-rows-[auto_1fr] md:overflow-hidden">
      <Cards
        title="Total Projects"
        icon={<IoFolderSharp />}
        description={`${inProgressProjects} in progress · ${completedProjects} completed`}
        className="bg-linear-to-r text-white from-blue-500 to-blue-300"
      >
        <p className="text-3xl font-bold">{totalProjects}</p>
      </Cards>

      <Cards
        title="Total Tasks"
        icon={<IoClipboardSharp />}
        description={`${inProgressTasks} in progress · ${completedTasks} completed`}
        className="bg-linear-to-r text-white from-green-500 to-green-300"
      >
        <p className="text-3xl font-bold">{totalTasks}</p>
      </Cards>

      <Cards
        title="Pending Tasks"
        icon={<IoTime />}
        className="sm:col-span-2 md:col-span-1 bg-linear-to-r text-white from-amber-500 to-yellow-400"
      >
        <p className="text-3xl font-bold">{pendingTasks.length}</p>
        <p className="text-sm opacity-80">
          {inProgressTasks} in progress · {plannedTasks} planned
        </p>
        {nextDue && (
          <p className="text-sm opacity-80 truncate">
            Next due: {nextDue.title} · {formatDate(nextDue.dueDate)}
          </p>
        )}
      </Cards>

      <Cards title="Project Progress" className="bg-white sm:col-span-2 min-h-0">
        <BarChart
          labels={projectNames}
          values={projectProgress}
          colors={["#facc15", "#4ade80", "#60a5fa"]}
        />
      </Cards>

      <Cards title="Task Distribution" className="bg-white sm:col-span-2 md:col-span-1 min-h-0">
        <PieChart
          labels={["Completed", "In Progress", "Planned"]}
          values={[completedTasks, inProgressTasks, plannedTasks]}
          colors={["#65ae95", "#ffc163", "#60a5fa"]}
        />
      </Cards>
    </div>
  );
}
