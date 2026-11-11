import Cards from "../components/Cards";
import PieChart from "../components/PieChart";
import LineChart from "../components/BarChart";
import { IoFolderSharp, IoClipboardSharp, IoTime } from "react-icons/io5";
import { getData } from "../utils/api";
import { useState, useEffect } from "react";

// how many items in a list have this status
const count = (list, status) =>
  list.filter((item) => item.status === status).length;

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getData("tasks")
      .then(setTasks)
      .catch(() => alert("Could not load data. Is json-server running?"));
    getData("projects").then(setProjects);
  }, []);

  const completedTasks = count(tasks, "Completed");
  const inProgressTasks = count(tasks, "In Progress");
  const plannedTasks = count(tasks, "Planned");

  // pending = not completed, nearest due date first
  const pendingTasks = tasks
    .filter((t) => t.status !== "Completed")
    .sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""));
  const nextDue = pendingTasks[0];

  return (
    <div className="grid grid-cols-3 grid-rows-[auto_1fr] gap-4 h-full overflow-hidden">
      <Cards
        title="Total Projects"
        icon={<IoFolderSharp />}
        description={`${count(projects, "In Progress")} in progress · ${count(projects, "Completed")} completed`}
        className="bg-linear-to-r text-white from-blue-500 to-blue-300"
      >
        <p className="text-3xl font-bold">{projects.length}</p>
      </Cards>

      <Cards
        title="Total Tasks"
        icon={<IoClipboardSharp />}
        description={`${inProgressTasks} in progress · ${completedTasks} completed`}
        className="bg-linear-to-r text-white from-green-500 to-green-300"
      >
        <p className="text-3xl font-bold">{tasks.length}</p>
      </Cards>

      <Cards
        title="Pending Tasks"
        icon={<IoTime />}
        className="bg-linear-to-r text-white from-amber-500 to-yellow-400"
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

      <Cards title="Weekly Chart" className="bg-white col-span-2 min-h-0">
        <LineChart
          labels={projects.map((p) => p.name)}
          values={projects.map((p) => p.progress)}
          colors={["#facc15", "#4ade80", "#60a5fa"]}
        />
      </Cards>

      <Cards title="Task Distribution" className="bg-white col-span-1 min-h-0">
        <PieChart
          labels={STATUS_LABELS}
          values={[completedTasks, inProgressTasks, plannedTasks]}
          colors={["#65ae95", "#ffc163", "#60a5fa"]}
        />
      </Cards>
    </div>
  );
}

const STATUS_LABELS = ["Completed", "In Progress", "Planned"];
