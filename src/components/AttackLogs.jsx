import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const AttackLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "attacks"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const attackData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLogs(attackData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Real-Time Attack Logs</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>IP</th>
            <th>Country</th>
            <th>City</th>
            <th>Type</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.ip}</td>
              <td>{log.country}</td>
              <td>{log.city}</td>
              <td>{log.attackType}</td>
              <td>{log.username}</td>
              <td>{log.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttackLogs;
