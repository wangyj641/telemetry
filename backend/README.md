# Backend

A small .NET Web API that receives, stores and serves telemetry data for demo and local development purposes. Intended to be run alongside the telemetry-frontend in this repository.

## Features

- REST endpoints for ingesting and querying telemetry
- Simple in-memory/store-backed storage (see project code)
- Example controller: TelemetryController (POST telemetry, GET latest/range)
- OpenAPI/Swagger support (if enabled in Program.cs)

## Prerequisites

- .NET SDK 8.0+ (check global.json / csproj if present)
- Windows / macOS / Linux — commands shown below are for Windows PowerShell but work on other OSes with minor changes
