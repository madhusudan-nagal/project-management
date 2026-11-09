import Cards from "../components/Cards";
import PieChart from "../components/PieChart";
import LineChart from "../components/BarChart";
import { IoFolderSharp, IoClipboardSharp, IoTime } from "react-icons/io5";
import data from "../db.json";

export default function DashboardPage() {
  // task array 
  const taskData = data.tasks;
  let str1 = "Completed";
  let str2 = "In Progress";

  let statusCompleted = (task) => task.status === `${str1}`
  let statusInProgress = (task) => task.status === `${str2}`

  const completed = taskData.filter(statusCompleted).length; 
  const inProgress = taskData.filter(statusInProgress).length; 





  const completed = taskData.filter((task) => task.status === "Completed").length; 
  const inProgress = taskData.filter(
    (t) => t.status === "In Progress",
  ).length; 
  const planned = data.tasks.filter((task) => task.status === "Planned").length;
  const totalProjects = data.projects.length;
  const totalTasks = data.tasks.length;

  const inProgressProjects = data.projects.filter(
    (project) => project.status === "In Progress",
  ).length;

  const completedProjects = data.projects.filter(
    (project) => project.status === "Completed",
  ).length;

  const pendingList = data.tasks
    .filter((task) => task.status !== "Completed")
    .slice()
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const nextDue = pendingList[0];

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
        description={`${inProgress} in progress · ${completed} completed`}
        className="bg-linear-to-r text-white from-green-500 to-green-300"
      >
        <p className="text-3xl font-bold">{totalTasks}</p>
      </Cards>

      <Cards
        title="Pending Tasks"
        icon={<IoTime />}
        className="bg-linear-to-r text-white from-amber-500 to-yellow-400"
      >
        <p className="text-3xl font-bold">{pendingList.length}</p>
        <p className="text-sm opacity-80">
          {inProgress} in progress · {planned} planned
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
          values={[completed, inProgress, planned]}
          colors={["#65ae95", "#ffc163", "#60a5fa"]}
        />
      </Cards>
    </div>
  );
}
