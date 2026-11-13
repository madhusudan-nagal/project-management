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

  const shortLabel = (text) =>
  text.length > 10 ? text.slice(0, 10) + "…" : text;

export default function BarChart({ labels, values, colors }) {
  const data = {
    labels,
    datasets: [
      { label: "Project progress (%)", data: values, backgroundColor: colors },
    ],
  };

  const options = {
    maintainAspectRatio: false, // fill the container's height
    scales: {
      x: {
        ticks: {
          maxRotation: 0, // keep labels flat, not tilted
          callback: function (value) {
            return shortLabel(this.getLabelForValue(value));
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100, // progress is a percentage
      },
    },
  };

  return (
    <div className="relative h-65">
      <Bar data={data} options={options} />
    </div>
  );
}
