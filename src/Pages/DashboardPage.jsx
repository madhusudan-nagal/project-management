import Cards from "../components/Cards";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";

// import { useSelector } from "react-redux";
// import { selectProjects } from "../store/projectSlice";

import {
  IoFolderSharp,
  IoClipboardSharp,
  IoTime,
  IoCheckmarkCircle,
  IoPieChart,
  IoWarning,
} from "react-icons/io5";
import { getData } from "../utils/api";
import { useState, useEffect } from "react";

// date format ----  changes "2026-11-20" into "20 Nov
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

  console.log(projects);

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

  // progress for each project = % of its tasks that are completed
  const projectProgress = projects.map((project) => {
    const projectTasks = tasks.filter(
      (t) => String(t.projectId) === String(project.id),
    );

    if (projectTasks.length === 0) return 0; // no tasks yet → 0%

    const completed = projectTasks.filter(
      (t) => t.status === "Completed",
    ).length;

    return Math.round((completed / projectTasks.length) * 100);
  });

  // const project = useSelector(selectProjects);
  // console.log("Projects from Redux:", projects);

  // console.log("projectProgress", projectProgress);

  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 w-full">
        <Cards
          title="Projects"
          icon={<IoFolderSharp />}
          description={`${inProgressProjects} in progress · ${completedProjects} completed`}
          className="h-full lg:col-span-3 bg-linear-to-r from-blue-600 to-blue-400 text-white"
        >
          <p className="text-3xl font-bold">{totalProjects}</p>
        </Cards>

        <Cards
          title="Tasks"
          icon={<IoClipboardSharp />}
          description="Total across all projects"
          className="h-full lg:col-span-3 bg-linear-to-r from-indigo-600 to-indigo-400 text-white"
        >
          <p className="text-3xl font-bold">{totalTasks}</p>
        </Cards>

        <Cards
          title="Completed"
          icon={<IoCheckmarkCircle />}
          description="Finished tasks"
          className="h-full lg:col-span-3 bg-linear-to-r from-emerald-600 to-emerald-400 text-white"
        >
          <p className="text-3xl font-bold">{completedTasks}</p>
        </Cards>

        <Cards
          title="Overall"
          icon={<IoPieChart />}
          description="Completion rate"
          className="h-full lg:col-span-3 bg-linear-to-r from-violet-600 to-purple-400 text-white"
        >
          <p className="text-3xl font-bold">{}%</p>
        </Cards>

        {/* ================= ROW 2: Status Stat Cards ================= */}
        <Cards
          title="To Do"
          icon=""
          description="Not started yet"
          className="h-full lg:col-span-3 bg-linear-to-r from-sky-600 to-cyan-400 text-white"
        >
          <p className="text-3xl font-bold">{plannedTasks}</p>
        </Cards>

        <Cards
          title="In Prog."
          icon=""
          description="Currently active"
          className="h-full lg:col-span-3 bg-linear-to-r from-amber-500 to-yellow-400 text-white"
        >
          <p className="text-3xl font-bold">{inProgressTasks}</p>
        </Cards>

        <Cards
          title="Pending"
          icon={<IoTime />}
          description={
            nextDue
              ? `Next: ${nextDue.title} · ${formatDate(nextDue.dueDate)}`
              : "Awaiting completion"
          }
          className="h-full lg:col-span-3 bg-linear-to-r from-orange-500 to-amber-400 text-white"
        >
          <p className="text-3xl font-bold">{pendingTasks.length}</p>
        </Cards>

        <Cards
          title="Overdue"
          icon={<IoWarning />}
          description="Past due date"
          className="h-full lg:col-span-3 bg-linear-to-r from-rose-600 to-red-400 text-white"
        >
          <p className="text-3xl font-bold flex items-center gap-2">
            {} <span className="text-2xl">⚠️</span>
          </p>
        </Cards>

        {/* ================= ROW 3: Charts ================= */}
        {/* Mobile & Tablet: Full width stacked | Desktop & 80% Zoom: 7 / 5 split */}
        <Cards
          title="Project-wise progress"
          className="min-w-0 h-full sm:col-span-2 lg:col-span-7 bg-white min-h-75 "
        >
          <div className="w-full h-full min-w-0">
            <BarChart
              labels={projectNames}
              values={projectProgress}
              colors={["#facc15", "#4ade80", "#60a5fa"]}
            />
          </div>
        </Cards>

        <Cards
          title="Task status"
          className="min-w-0 h-full sm:col-span-2 lg:col-span-5 bg-white min-h-75"
        >
          <div className="w-full h-full min-w-0">
            <PieChart
              labels={["Completed", "In Progress", "Planned"]}
              values={[completedTasks, inProgressTasks, plannedTasks]}
              colors={["#65ae95", "#ffc163", "#60a5fa"]}
            />
          </div>
        </Cards>

        {/* ================= ROW 4: Lists ================= */}
        <Cards
          title="My tasks"
          description="Assigned to me"
          className="min-w-0 h-full sm:col-span-2 lg:col-span-7 bg-white"
        >
          {/* Assigned tasks list */}
        </Cards>

        <Cards
          title="Recent activity"
          className="min-w-0 h-full sm:col-span-2 lg:col-span-5 bg-white"
        >
          {/* Activity feed */}
        </Cards>
      </div>
    </div>
  );
}
