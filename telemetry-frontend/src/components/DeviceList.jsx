import React from "react";

export default function DeviceList({ machines, selected, onSelect }) {
  return (
    <div>
      <h3>Devices</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {machines.map((m) => (
          <li
            key={m}
            style={{
              padding: "8px",
              cursor: "pointer",
              background: selected === m ? "#eee" : "transparent",
            }}
            onClick={() => onSelect(m)}
          >
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
