import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import LiveAttackLogs from "./components/LiveAttackLogs";
import AttackAnalysis from "./components/AttackAnalysis";
// import CredentialBreach from "./components/CredentialInsights";
// import AttackLocations from "./components/GeospatialAttackView";
import GeospatialAttackView from "./components/GeospatialAttackView";
import AttackSimulation from "./components/AttackSimulation";
import AdminControlPanel from "./components/AdminControlPanel";
import CredentialInsights from "./components/CredentialInsights"; 
import RealTimeAttackLogs from "./components/RealTimeAttackLogs"; // ✅ Import the missing component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/logs" element={<LiveAttackLogs />} />
        <Route path="/analysis" element={<AttackAnalysis />} />
        <Route path="/credentials" element={<CredentialInsights />} />
        <Route path="/locations" element={<GeospatialAttackView />} />
        <Route path="/simulate" element={<AttackSimulation />} />
        <Route path="/admin" element={<AdminControlPanel />} />
        <Route path="/realtime" element={<RealTimeAttackLogs />} />  {/* ✅ Fix Added */}
      </Routes>
    </>
  );
}

export default App;
