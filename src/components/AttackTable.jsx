import React from "react";
import "../styles/AttackTable.css";

const AppTable = ({ attacks = [] }) => { // ✅ Default empty array to prevent errors
  return (
    <div className="table-container">
      <h2>🚀 Attack Logs Table</h2>
      <table className="attack-table">
        <thead>
          <tr>
            <th>#</th>
            <th>IP Address</th>
            <th>Attack Type</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {attacks.length > 0 ? (
            attacks.map((attack, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{attack.ip || "N/A"}</td> 
                <td>{attack.type || "Unknown Attack"}</td> 
                <td>{attack.timestamp ? new Date(attack.timestamp).toLocaleString() : "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No attacks logged yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppTable;
