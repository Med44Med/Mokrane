import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Legend
);

export const LineChart = ({ labels, data }) => {
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Sales",
          data,
          borderColor: "rgb(75,192,192)",
          backgroundColor: "rgba(75,192,192,0.5)",
          tension: 0.1,
        },
      ],
    }),
    [labels, data]
  );
  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "monthly sales",
        },
      },
    }),
    []
  );

  return <Line data={chartData} options={options} />;
};

export const BarChart = ({ labels, data }) => {
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Sales",
          data,
          borderColor: "rgb(75,0,192)",
          borderWidth:2,
          barThickness:100,
          backgroundColor: "rgba(75,192,192,0.5)",
          tension: 0.1,
        },
      ],
    }),
    [data, labels]
  );
  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "monthly sales",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }),
    []
  );

  return <Bar data={chartData} options={options} />;
};
