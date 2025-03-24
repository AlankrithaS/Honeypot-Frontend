import React, { useEffect, useState } from "react";
import { getAttackLogs } from "../api";

function AttackList() {
  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAttackLogs();
      setAttacks(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Attack Logs</h2>
      <ul>
        {attacks.map((attack, index) => (
          <li key={index}>
            {attack.ip} - {attack.type} - {attack.country}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttackList;
