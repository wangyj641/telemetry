import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function TelemetryMap({ points = [] }) {
  const last = points.length ? points[points.length - 1] : null;
  const center =
    last && last.gpsLat ? [last.gpsLat, last.gpsLon] : [50.4452, -104.6189];
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((p, i) =>
        p.gpsLat && p.gpsLon ? (
          <Marker key={i} position={[p.gpsLat, p.gpsLon]}>
            <Popup>
              <div>
                <div>
                  <strong>{p.machine_id || p.machineId}</strong>
                </div>
                <div>time: {new Date(p.timestamp).toLocaleString()}</div>
                <div>depth: {p.seeding_depth ?? p.seedingDepth}</div>
                <div>speed: {p.speed}</div>
              </div>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}
