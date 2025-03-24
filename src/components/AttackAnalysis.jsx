import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "../styles/AttackAnalysis.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttackAnalysis = () => {
  const data = {
    labels: ["SQL Injection", "Brute Force", "XSS", "DDoS"],
    datasets: [
      {
        label: "Attack Frequency",
        data: [5, 12, 8, 15],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="attack-analysis">
      <h1>📊 Attack Analysis</h1>
      <Bar data={data} />
    </div>
  );
};

export default AttackAnalysis;
