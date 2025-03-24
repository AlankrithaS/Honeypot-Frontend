import axios from "axios";

const API_URL = "http://localhost:5000";

// ✅ GET Attack Logs
export const getAttackLogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/attacks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching attack logs:", error);
    return [];
  }
};

// ✅ POST New Attack
export const postAttackLog = async (attackData) => {
  try {
    const response = await axios.post(`${API_URL}/attacks`, attackData);
    return response.data;
  } catch (error) {
    console.error("Error posting attack log:", error);
    return null;
  }
};
