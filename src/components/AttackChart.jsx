import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttackChart = ({ attacks = [] }) => { // ✅ Default empty array to prevent undefined error
  if (!attacks || attacks.length === 0) {
    return <p>No attack data available.</p>; // ✅ Prevents error when no data
  }

  // ✅ Reduce attack types safely
  const attackTypes = attacks.reduce((acc, attack) => {
    if (attack.type) {
      acc[attack.type] = (acc[attack.type] || 0) + 1;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(attackTypes),
    datasets: [
      {
        label: "Attack Types",
        data: Object.values(attackTypes),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return <Bar data={data} />;
};

export default AttackChart;
