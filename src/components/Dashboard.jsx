import React, { useState, useEffect } from "react";
import socket from "../socket";
import axios from "axios";
import "../styles/Dashboard.css";
import honeypotImage from "../assets/honeypot.png"; // Make sure to add the PNG
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2"; // Import Pie chart

// Register the required components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalAttacks: 0,
    uniqueIPs: [],
    attackRate: "Loading...",
  });

  const [attackTrends, setAttackTrends] = useState([]);
  const [recentAttacks, setRecentAttacks] = useState([]);

  // Fetch Initial Attack Data
  useEffect(() => {
    axios.get("http://localhost:5000/api/attacks").then((response) => {
      const logs = response.data;
      const uniqueIPs = [...new Set(logs.map((log) => log.sourceIP))];

      setMetrics({
        totalAttacks: logs.length,
        uniqueIPs: uniqueIPs,
        attackRate: logs.length > 1000 ? "High" : "Moderate",
      });

      const trends = logs.reduce((acc, log) => {
        acc[log.type] = (acc[log.type] || 0) + 1;
        return acc;
      }, {});

      setAttackTrends(
        Object.entries(trends).map(([type, count]) => ({ type, count }))
      );

      setRecentAttacks(logs.slice(-5).reverse()); // Get last 5 attacks
    });
  }, []);

  // Handle Live Updates from Socket.IO
  useEffect(() => {
    socket.on("newAttackLog", (attackData) => {
      setMetrics((prev) => ({
        ...prev,
        totalAttacks: prev.totalAttacks + 1,
        uniqueIPs: prev.uniqueIPs.includes(attackData.sourceIP)
          ? prev.uniqueIPs
          : [...prev.uniqueIPs, attackData.sourceIP],
        attackRate: prev.totalAttacks + 1 > 1000 ? "High" : "Moderate",
      }));

      setAttackTrends((prevTrends) => {
        const existingTrend = prevTrends.find((trend) => trend.type === attackData.type);
        if (existingTrend) {
          return prevTrends.map((trend) =>
            trend.type === attackData.type ? { ...trend, count: trend.count + 1 } : trend
          );
        } else {
          return [...prevTrends, { type: attackData.type, count: 1 }];
        }
      });

      setRecentAttacks((prev) => [attackData, ...prev.slice(0, 4)]);
    });

    return () => {
      socket.off("newAttackLog");
    };
  }, []);

  // Chart.js Data
  const barChartData = {
    labels: attackTrends.map((trend) => trend.type),
    datasets: [
      {
        label: "Attack Count",
        data: attackTrends.map((trend) => trend.count),
        backgroundColor: ["#ff4444", "#ffbb33", "#33b5e5", "#66cc33", "#9933cc"],
      },
    ],
  };

  const pieChartData = {
    labels: attackTrends.map((trend) => trend.type),
    datasets: [
      {
        data: attackTrends.map((trend) => trend.count),
        backgroundColor: ["#ff3b3b", "#ffa600", "#00bfa5", "#4a90e2", "#8e44ad"],
      },
    ],
  };

  return (
    <div className="dashboard">
      {/* 🏆 Honeypot Image Header */}
      <div className="honeypot-header">
        <img src={honeypotImage} alt="Honeypot" />
        <h2>Cybersecurity Honeypot Dashboard</h2>
      </div>

      {/* 🔹 Metrics Section */}
      <div className="metrics">
        <div className="metric">
          <h3>🔰 Total Attacks</h3>
          <p>{metrics.totalAttacks}</p>
        </div>
        <div className="metric">
          <h3>🌐 Unique IPs</h3>
          <p>{metrics.uniqueIPs.length}</p>
        </div>
        <div className={`metric ${metrics.attackRate === "High" ? "high" : "moderate"}`}>
          <h3>⚡ Attack Rate</h3>
          <p>{metrics.attackRate}</p>
        </div>
      </div>

      {/* 📊 Graphs */}
      <div className="charts">
        <div className="bar-chart">
          <h3>📊 Attack Trends</h3>
          <Bar data={barChartData} />
        </div>
        <div className="pie-chart">
          <h3>🟠 Attack Distribution</h3>
          <Pie data={pieChartData} />
        </div>
      </div>

      {/* 🚨 Live Attack Alerts */}
      <div className="recent-attacks">
        <h3>🚨 Recent Attacks</h3>
        <ul>
          {recentAttacks.map((attack, index) => (
            <li key={index}>
              <span className="type">{attack.type}</span>
              <span className="ip">({attack.sourceIP})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
