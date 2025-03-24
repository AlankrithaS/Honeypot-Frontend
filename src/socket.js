import { io } from "socket.io-client";

// ✅ Connect to the backend server
const socket = io("http://localhost:5000", {
  transports: ["websocket"], // Ensure WebSocket transport
});

socket.on("connect", () => {
  console.log("🟢 Connected to WebSocket server");
});

socket.on("disconnect", () => {
  console.log("🔴 Disconnected from WebSocket server");
});

socket.on("newAttackLog", (data) => {
  console.log("🔥 New Attack Log Received:", data);
});

export default socket;
