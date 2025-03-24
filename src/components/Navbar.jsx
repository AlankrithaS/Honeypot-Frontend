import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/realtime">Live Attack Logs</Link></li>
        <li><Link to="/analysis">Attack Analysis</Link></li>
        <li><Link to="/credentials">Credential Insights</Link></li>
        <li><Link to="/locations">Geospatial Attack View</Link></li>
        <li><Link to="/simulate">Attack Simulation</Link></li>
        <li><Link to="/admin">Admin Control Panel</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;