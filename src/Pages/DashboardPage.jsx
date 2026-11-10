import Cards from "../components/Cards";
import PieChart from "../components/PieChart";
import LineChart from "../components/BarChart";
import { IoFolderSharp, IoClipboardSharp, IoTime } from "react-icons/io5";
import data from "../db.json";

export default function DashboardPage() {
  console.log("Dashboard-Data..................");
  console.log("Tasks-Data.....");

  //filtering tasks array to get completed, in progress and planned data(object)...

  const totalTasks = data.tasks.length;

  const completedTasks = data.tasks.filter(
    (t) => t.status === "Completed",
  ).length;
  console.log("CompletedTasks : ", completedTasks);

  const inProgressTasks = data.tasks.filter(
    (t) => t.status === "In Progress",
  ).length;
  console.log("inProgressTasks : ", inProgressTasks);

  const plannedTasks = data.tasks.filter((t) => t.status === "Planned").length;
  console.log("plannedTasks : ", plannedTasks);

  //Checking for pending object which are not completed
  const pendingTasks = data.tasks
    .filter((t) => t.status !== "Completed")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  console.log("pendingTasks : ", pendingTasks);

  //filtering Projects array to get completed, in progress and planned data(object)...
  const totalProjects = data.projects.length;
  const completedProjects = data.projects.filter(
    (project) => project.status === "Completed",
  ).length;
  console.log("Completed Proejects :");

  const inProgressProjects = data.projects.filter(
    (project) => project.status === "In Progress",
  ).length;

  const nextDue = pendingTasks[0];

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  return (
    <div className="grid grid-cols-3 grid-rows-[auto_1fr] gap-4 h-full overflow-hidden">
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
          labels={data.projects.map((project) => project.name)}
          values={data.projects.map((project) => project.progress)}
          colors={["#facc15", "#4ade80", "#60a5fa"]}
        />
      </Cards>

      <Cards title="Task Distribution" className="bg-white col-span-1 min-h-0">
        <PieChart
          labels={["Completed", "In Progress", "Planned"]}
          values={[completedTasks, inProgressTasks, plannedTasks]}
          colors={["#65ae95", "#ffc163", "#60a5fa"]}
        />
      </Cards>
    </div>
  );
}
