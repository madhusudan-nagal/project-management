import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function LineChart({ labels, values }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Ongoing Projects",
        data: values,
        backgroundColor: "#60a5fa",
        borderColor: "#60a5fa",
      },
    ],
  };

  return (
    <div className="relative h-65 flex flex-row justify-center">
      <Bar data={data} />
    </div>
  );
}
