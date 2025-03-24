import React from "react";
import "../styles/CredentialInsights.css";

const CredentialInsights = () => {
  const commonPasswords = [
    "123456", "password", "admin", "qwerty", "abc123", "letmein", "welcome",
    "monkey", "football", "shadow", "123123", "654321", "superman", "trustno1",
    "passw0rd", "iloveyou", "starwars", "dragon", "baseball", "sunshine", 
    "ninja", "master", "hello", "freedom", "whatever", "qazwsx", "asdfgh",    "123456", "password", "admin", "qwerty", "abc123", "letmein", "welcome",
    "monkey", "football", "shadow", "123123", "654321", "superman", "trustno1",
    "passw0rd", "iloveyou", "starwars", "dragon", "baseball", "sunshine", 
    "ninja", "master", "hello", "freedom", "whatever", "qazwsx", "asdfgh"
  ];

  const randomRotation = () => `${Math.random() * 40 - 20}deg`; // Rotate words randomly
  const randomSize = () => `${Math.random() * 2 + 1}em`; // Random font sizes

  return (
    <div className="credential-insights">
      <h2>🔑 Credential Breach Insights</h2>
      <p className="subtext">
        These are some of the **most commonly used passwords** found in breach databases.
        Weak passwords make systems vulnerable to brute-force attacks.
      </p>

      <div className="word-cloud">
        {commonPasswords.map((password, index) => (
          <span
            key={index}
            className="password-item"
            style={{
              transform: `rotate(${randomRotation()})`,
              fontSize: randomSize(),
              color: `hsl(${Math.random() * 360}, 80%, 60%)`, // Random bright colors
            }}
          >
            {password}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CredentialInsights;
