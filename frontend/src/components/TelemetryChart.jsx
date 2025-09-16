import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function TelemetryChart({ points = [] }) {
  const labels = points.map((p) => p.timestamp || p.created_at);
  const depth = points.map((p) => p.seeding_depth ?? p.seedingDepth ?? null);
  const speed = points.map((p) => p.speed ?? null);

  const data = {
    labels,
    datasets: [
      {
        label: "Seeding Depth",
        data: labels.map((t, i) => ({ x: t, y: depth[i] })),
        yAxisID: "y1",
        tension: 0.2,
      },
      {
        label: "Speed",
        data: labels.map((t, i) => ({ x: t, y: speed[i] })),
        yAxisID: "y2",
        tension: 0.2,
      },
    ],
  };

  const options = {
    parsing: false,
    plugins: { legend: { position: "top" } },
    scales: {
      x: { type: "time", time: { unit: "minute" } },
      y1: {
        type: "linear",
        position: "left",
        title: { display: true, text: "Depth" },
      },
      y2: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Speed" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
