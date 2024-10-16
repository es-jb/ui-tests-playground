import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CounterChart({ data, duration }) {
  const filteredData = data.filter(
    (point) => point.time > new Date(Date.now() - duration * 60 * 1000)
  );

  const chartData = {
    labels: filteredData.map((point) => point.time.toLocaleTimeString()),
    datasets: [
      {
        label: "Counter Value",
        data: filteredData.map((point) => point.value),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Counter History",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default CounterChart;
