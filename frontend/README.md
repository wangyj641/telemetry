# Frontend

A small React + Vite frontend for the Telemetry API. It fetches telemetry data from the backend and provides a simple UI to browse devices and view recent telemetry points.

## Features

- Vite + React for fast development
- Simple device list and live updates
- Uses the API helper functions [`fetchMachines`](telemetry-frontend/src/api.js), [`fetchRange`](telemetry-frontend/src/api.js) and [`fetchLatest`](telemetry-frontend/src/api.js)
- Components: main app at [`src/App.tsx`](telemetry-frontend/src/App.tsx) and [`src/components/DeviceList.jsx`](telemetry-frontend/src/components/DeviceList.jsx)

## Prerequisites

- Node.js 18+
- npm or yarn
- Running backend Telemetry API (see [`TelemetryApi/TelemetryApi.csproj`](TelemetryApi/TelemetryApi.csproj) and [`TelemetryApi/Program.cs`](TelemetryApi/Program.cs))

## Quick start

1. Install dependencies

   ```bash
   cd frontend
   npm install
   ```

2. Run dev server

   ```bash
   npm run dev
   ```

   App opens at http://localhost:5173 (see [index.html](http://_vscodecontentref_/0)).

3. Build for production
   ```bash
   npm run build
   npm run preview
   ```

## Configuration

- Backend base URL is set in [api.js](http://_vscodecontentref_/1) via the [API_BASE](http://_vscodecontentref_/2) constant. Update it if the API runs on a different host or port.

## Project structure (key files)

- [package.json](http://_vscodecontentref_/3) — scripts and dependencies
- [vite.config.ts](http://_vscodecontentref_/4) — Vite config
- [index.html](http://_vscodecontentref_/5) — app entry
- [main.tsx](http://_vscodecontentref_/6) — React entry
- [App.tsx](http://_vscodecontentref_/7) — main app logic
- [api.js](http://_vscodecontentref_/8) — API helpers ([fetchMachines](http://_vscodecontentref_/9), [fetchRange](http://_vscodecontentref_/10), [fetchLatest](http://_vscodecontentref_/11))
- [DeviceList.jsx](http://_vscodecontentref_/12) — device list component

## How it talks to the backend

The frontend calls endpoints under `/api/v1/telemetry` exposed by the Telemetry API. The backend implementation lives in this workspace at [TelemetryController.cs](http://_vscodecontentref_/13) and the project file is [TelemetryApi.csproj](http://_vscodecontentref_/14).

Useful backend files:

- [TelemetryController.cs](http://_vscodecontentref_/15) — POST and GET endpoints used by the frontend
- [Program.cs](http://_vscodecontentref_/16) — app startup

## Notes

- Device simulator: [simulate_device.ps1](http://_vscodecontentref_/17) posts sample telemetry to the API.
- If you run Docker compose, see [docker-compose.yml](http://_vscodecontentref_/18) at the repository root.

## Contributing

Open issues or PRs. Keep changes small and run the dev server locally to verify behavior.

## License

See repository root README or license
