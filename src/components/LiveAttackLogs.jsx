import React, { useState, useEffect } from "react";
import socket from "../socket";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Notifications
import "react-toastify/dist/ReactToastify.css";
import WorldMap from "./WorldMap"; // ✅ Map Component (Added below)

const LiveAttackLogs = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterIP, setFilterIP] = useState("");

  useEffect(() => {
    // Fetch attack logs initially
    axios.get("http://localhost:5000/api/logs")
      .then(res => setLogs(res.data))
      .catch(err => console.error("❌ Error fetching logs:", err));

    // Listen for real-time attacks via WebSocket
    socket.onmessage = (event) => {
      const newLog = JSON.parse(event.data);
      console.log("📩 New Attack Log:", newLog);

      // Show toast notification 🔔
      toast.warning(`⚠️ New Attack: ${newLog.type} from ${newLog.ip}`);

      setLogs(prevLogs => [newLog, ...prevLogs]);
    };
  }, []);

  // Filter logs
  const filteredLogs = logs.filter(log =>
    log.type.toLowerCase().includes(filterType.toLowerCase()) &&
    log.ip.includes(filterIP) &&
    (searchTerm === "" || log.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="live-attack-logs">
      <h2>📡 Live Attack Logs</h2>
      
      {/* Search and Filters */}
      <input 
        type="text" 
        placeholder="Search by attack type..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <input 
        type="text" 
        placeholder="Filter by IP..." 
        value={filterIP} 
        onChange={(e) => setFilterIP(e.target.value)}
      />

      <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
        <option value="">All Types</option>
        <option value="Brute Force">Brute Force</option>
        <option value="SQL Injection">SQL Injection</option>
        <option value="DDoS">DDoS</option>
      </select>

      {/* Real-time Logs Table */}
      <div className="logs">
        {filteredLogs.length === 0 ? (
          <p>No attack logs available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Attack Type</th>
                <th>IP Address</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr key={index} className={log.type === "DDoS" ? "critical" : ""}>
                  <td>{log.type}</td>
                  <td>{log.ip}</td>
                  <td>{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Interactive Map for Attack Locations */}
      <WorldMap logs={logs} />
    </div>
  );
};

export default LiveAttackLogs;
