import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ labels, values, colors }) {
  // add up all values; if the total is 0 there's nothing to draw
  const total = values.reduce((sum, value) => sum + value, 0);

  if (total === 0) {
    return (
      <div className="h-60 flex items-center justify-center text-sm text-gray-400">
        No tasks yet
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Tasks",
        data: values,
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // fill the h-60 box
  };

  return (
    <div className="relative h-60">
      <Pie data={data} options={options} />
    </div>
  );
}
