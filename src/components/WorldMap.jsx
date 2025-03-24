import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WorldMap = ({ logs }) => {
  return (
    <div className="map-container">
      <h3>🌍 Attack Origins</h3>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "300px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {logs.map((log, index) => (
          <Marker key={index} position={[log.latitude, log.longitude]}>
            <Popup>
              <strong>{log.type}</strong> attack from {log.ip}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
