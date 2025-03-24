import React from "react";
import socket from "../socket";
import "../styles/AttackSimulation.css";
//import attackImage from "../assets/attack_types.png"; // Add an image showing attack types

const AttackSimulation = () => {
  const simulateAttack = (type) => {
    const attackData = {
      type,
      ip: "192.168.1.1",
      time: new Date().toISOString(),
      location: "Unknown",
    };
    socket.send(JSON.stringify(attackData));
    console.log(`🛡️ Simulated Attack: ${type}`);
  };

  return (
    <div className="attack-simulation">
      <h2>🔴 Attack Simulation</h2>
      <p>Click on an attack type to simulate it. The attack will be logged and visualized in the honeypot dashboard.</p>

      <div className="attack-buttons">
        <button onClick={() => simulateAttack("Brute Force")}>🔑 Brute Force</button>
        <button onClick={() => simulateAttack("SQL Injection")}>💾 SQL Injection</button>
        <button onClick={() => simulateAttack("DDoS")}>🌊 DDoS Attack</button>
      </div>

      <div className="attack-info">
        <h3>📌 What Happens?</h3>
        <p>Simulating these attacks helps test honeypot security. No real attacks are performed.</p>
      </div>
    </div>
  );
};

export default AttackSimulation;
