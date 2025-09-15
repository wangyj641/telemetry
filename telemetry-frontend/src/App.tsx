import React, { useEffect, useState } from "react";
import { fetchMachines, fetchRange, fetchLatest } from "./api";

import DeviceList from "./components/DeviceList";

export default function App() {
  const [machines, setMachines] = useState([]);
  const [selected, setSelected] = useState(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    (async () => {
      const ms = await fetchMachines();
      setMachines(ms);
      if (ms && ms.length) setSelected(ms[0]);
    })();
  }, []);

  useEffect(() => {
    if (!selected) return;
    const to = new Date();
    const from = new Date(to.getTime() - 1000 * 60 * 60); // 最近 1 小时
    (async () => {
      const data = await fetchRange(
        selected,
        from.toISOString(),
        to.toISOString()
      );
      setPoints(data);
    })();

    const t = setInterval(async () => {
      const latest = await fetchLatest(selected);
      if (latest) {
        setPoints((prev) => [...prev, latest].slice(-500));
      }
    }, 10000);

    return () => clearInterval(t);
  }, [selected]);

  return (
    <div className="app">
      <header className="header">Telemetry Dashboard</header>
      <div className="layout">
        <aside className="sidebar">
          <DeviceList
            machines={machines}
            selected={selected}
            onSelect={setSelected}
          />
        </aside>
      </div>
    </div>
  );
}
