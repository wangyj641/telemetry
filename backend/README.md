# Backend

A small .NET Web API that receives, stores and serves telemetry data for demo and local development purposes. Intended to be run alongside the telemetry-frontend in this repository.

## Features

- REST endpoints for ingesting and querying telemetry
- Simple in-memory/store-backed storage (see project code)
- Example controller: TelemetryController (POST telemetry, GET latest/range)
- OpenAPI/Swagger support (if enabled in Program.cs)

## Prerequisites

- .NET SDK 8.0+ (check TelemetryApi global.json / csproj if present)
- Windows / macOS / Linux — commands shown below are for Windows PowerShell but work on other OSes with minor changes

## Docker

```bash
docker compose up --build
```

See docker-compose.yml at repository root for service ports and configuration.

## Create DB

```bash
PGPASSWORD=demo psql -h localhost -U demo -d telemetrydb -f init.sql
```

## Quick start (local)

1. Restore and run the API

   ```powershell
   cd backend
   dotnet restore
   dotnet run
   ```

2. Send sample telemetry
   ```powershell
   .\simulate_device.ps1
   ```
   Or use your own client to POST telemetry to the API endpoints.
