import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register necessary Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const AdminControlPanel = () => {
  const [attackTrends, setAttackTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/trends");
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        const data = await response.json();
        console.log("📊 Trend Data:", data);
        setAttackTrends(data);
      } catch (err) {
        console.error("❌ Error fetching attack trends:", err);
        setError("Failed to load attack trends.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  if (loading) return <p>Loading attack trends...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (attackTrends.length === 0) return <p>No attack trends available.</p>;

  const chartData = {
    labels: attackTrends.map((item) => item.type),
    datasets: [
      {
        label: "Number of Attacks",
        data: attackTrends.map((item) => item.count),
        borderColor: "blue",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.3, // Smoothen the line
        borderWidth: 2,
        pointRadius: 3, // Size of points
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: {
        display: true,
        text: "Attack Trends Over Time",
        font: { size: 16 },
      },
    },
    scales: {
      x: { title: { display: true, text: "Attack Types" } },
      y: { title: { display: true, text: "Number of Attacks" }, beginAtZero: true },
    },
  };

  return (
    <div>
      <h2>⚙️ Admin Control Panel</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default AdminControlPanel;
