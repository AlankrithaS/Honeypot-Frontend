import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Default map marker
const defaultIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// ✅ Constant first attack location (Christ University)
const initialLocations = [
  { latitude: 12.9355, longitude: 77.6059, city: "Christ University 🎓" }
];

const GeoMap = () => {
  const [attackLocations, setAttackLocations] = useState(initialLocations);

  // Function to fetch random attack locations
  const fetchLocation = async () => {
    try {
      const response = await fetch("https://random-data-api.com/api/v2/addresses");
      const data = await response.json();

      if (data.latitude && data.longitude) {
        const newLocation = {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          city: data.city || "Unknown"
        };

        // Add new location & limit the list to last 50 points
        setAttackLocations((prev) => [...prev, newLocation].slice(-50));
      }
    } catch (error) {
      console.error("❌ Error fetching location:", error);
    }
  };

  // Fetch a new attack every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchLocation, 5000);
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {attackLocations.map((loc, index) => (
        <Marker key={index} position={[loc.latitude, loc.longitude]} icon={defaultIcon}>
          <Popup>
          🔥 <strong>{loc.city}</strong> <br />
            ({loc.latitude}, {loc.longitude}) 🔥
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GeoMap;
