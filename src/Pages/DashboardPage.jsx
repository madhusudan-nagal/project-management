import Cards from "../components/Cards";
import PieChart from "../components/PieChart";
import LineChart from "../components/BarChart";
import data from "../db.json";

export default function DashboardPage() {
  const completed = data.tasks.filter((t) => t.status === "Completed").length; // 3
  const inProgress = data.tasks.filter((t) => t.status === "In Progress").length; // 4
  const planned = data.tasks.filter((t) => t.status === "Planned").length;
  const totalProjects = data.projects.length;
  const totalTasks = data.tasks.length;
  const pendingTasks = data.tasks.filter(
    (task) => task.status !== "Completed",
  ).length;
 
  const todayDate = new Date().toLocaleDateString("en-CA");
  const OverDueTasks = data.tasks.filter(
    (task) => task.dueDate < todayDate && task.status !== "Completed",
  ).length;

  return (
    <div className="grid grid-cols-5 grid-rows-[auto] gap-4 h-full overflow-hidden">
      <Cards
        title="Total Projects"
        className="bg-linear-to-r text-white from-blue-500 to-blue-300 col-span-1 transition-transform duration-300"
      >
        <p className="text-3xl font-bold">{totalProjects}</p>
      </Cards>

      <Cards
        title="Total Tasks"
        className="bg-linear-to-r text-white from-green-500 to-green-300 col-span-1 transition-transform duration-300"
      >
        <p className="text-3xl font-bold">{totalTasks}</p>
      </Cards>

      <Cards
        title="Pending Tasks"
        className="bg-linear-to-r text-white from-yellow-500 to-yellow-300 col-span-1 transition-transform duration-300"
      >
        <p className="text-3xl font-bold">{pendingTasks}</p>
      </Cards>
      <Cards
        title="Overdue Tasks"
        className="bg-linear-to-r text-white from-red-300 to-gray-300 col-span-2 transition-transform duration-300"
      >
        <p className="text-3xl font-bold">{OverDueTasks}</p>
      </Cards>

      <Cards title="Weekly Chart" className="bg-white col-span-3">
        <LineChart
          labels={data.projects.map((project) => project.name)}
          values={data.projects.map((project) => project.progress)}
          colors={["#facc15", "#4ade80", "#60a5fa"]}
        />
      </Cards>

      <Cards title="Task Distribution" className="bg-white col-span-2">
        <PieChart
          labels={["Completed", "In Progress", "Planned"]}
          values={[completed, inProgress, planned]}
          colors={["#65ae95", "#ffc163", "#60a5fa"]}
        />
      </Cards>
    </div>
  );
}
