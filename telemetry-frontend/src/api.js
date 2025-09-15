export const API_BASE = "http://localhost:5000";

export async function fetchMachines() {
  const res = await fetch(`${API_BASE}/api/v1/telemetry/machines`);
  return res.json();
}

export async function fetchRange(machineId, fromIso, toIso) {
  const url = new URL(`${API_BASE}/api/v1/telemetry/${machineId}/range`);
  url.searchParams.set("from", fromIso);
  url.searchParams.set("to", toIso);
  const res = await fetch(url.toString());
  return res.json();
}

export async function fetchLatest(machineId) {
  const res = await fetch(`${API_BASE}/api/v1/telemetry/${machineId}/latest`);
  return res.json();
}
