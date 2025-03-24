import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../styles/RealTimeAttackLogs.css"; // Import CSS

const socket = io("http://localhost:5000");

const RealTimeAttackLogs = () => {
  const [attackLogs, setAttackLogs] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    socket.on("newAttackLog", (log) => {
      console.log("🔥 New Attack Log Received:", log);
      if (!log || !log.type) return; // Ignore invalid logs
      setAttackLogs((prevLogs) => [log, ...prevLogs.slice(0, 49)]); // Keep max 50 logs
    });

    return () => socket.off("newAttackLog");
  }, []);

  const filteredLogs = attackLogs.filter((log) =>
    log?.type?.toLowerCase()?.includes(filterText.toLowerCase())
  );

  return (
    <div className="real-time-logs">
      <h2>🔴 Real-Time Attack Logs</h2>
      <input
        type="text"
        placeholder="Filter by attack type..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="filter-input"
      />
      <div className="log-container">
        {filteredLogs.length === 0 ? (
          <p className="no-logs">No attack logs available.</p>
        ) : (
          <table className="log-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Source IP</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.type}</td>
                  <td>{log.sourceIP || "Unknown"}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RealTimeAttackLogs;
