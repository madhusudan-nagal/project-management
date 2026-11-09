import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({ labels, values, colors }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of Tasks",
        data: values,
        backgroundColor: colors,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="relative h-60 flex flex-row justify-center">
      <Pie data={data} />
    </div>
  );
}
