using Microsoft.AspNetCore.Mvc;
using System.Data;
using Dapper;
using Npgsql;
using TelemetryApi.Models;
using Newtonsoft.Json;

namespace TelemetryApi.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class TelemetryController : ControllerBase
{
    private readonly IConfiguration _cfg;
    public TelemetryController(IConfiguration cfg) => _cfg = cfg;

    private IDbConnection CreateConnection()
    {
        var cs = _cfg.GetConnectionString("DefaultConnection");
        return new NpgsqlConnection(cs);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] TelemetryDto dto)
    {
        Console.WriteLine("------------------ post a data ------------------");
        if (dto == null || string.IsNullOrWhiteSpace(dto.MachineId))
            return BadRequest("Invalid payload");

        var sql = @"INSERT INTO telemetry(machine_id, timestamp, gps_lat, gps_lon, seeding_depth, speed, payload)
                    VALUES (@MachineId, @Timestamp, @GpsLat, @GpsLon, @SeedingDepth, @Speed, @Payload::jsonb);";

        var payloadJson = dto.Payload == null ? "{}" : JsonConvert.SerializeObject(dto.Payload);

        using var conn = CreateConnection();
        await conn.ExecuteAsync(sql, new
        {
            MachineId = dto.MachineId,
            Timestamp = dto.Timestamp.ToUniversalTime(),
            GpsLat = dto.GpsLat,
            GpsLon = dto.GpsLon,
            SeedingDepth = dto.SeedingDepth,
            Speed = dto.Speed,
            Payload = payloadJson
        });

        return Created(string.Empty, null);
    }

    [HttpGet("{machineId}/latest")]
    public async Task<IActionResult> GetLatest(string machineId)
    {
        using var conn = CreateConnection();
        var sql = "SELECT * FROM telemetry WHERE machine_id=@MachineId ORDER BY timestamp DESC LIMIT 1";
        var item = await conn.QueryFirstOrDefaultAsync(sql, new { MachineId = machineId });
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpGet("{machineId}/range")]
    public async Task<IActionResult> GetRange(string machineId, DateTime from, DateTime to)
    {
        using var conn = CreateConnection();
        var sql = "SELECT * FROM telemetry WHERE machine_id=@MachineId AND timestamp BETWEEN @From AND @To ORDER BY timestamp";
        var rows = await conn.QueryAsync(sql, new { MachineId = machineId, From = from.ToUniversalTime(), To = to.ToUniversalTime() });
        return Ok(rows);
    }

    [HttpGet("machines")]
    public async Task<IActionResult> GetMachines()
    {
        Console.WriteLine("------------------ get all data ------------------");
        using var conn = CreateConnection();
        var sql = "SELECT DISTINCT machine_id FROM telemetry ORDER BY machine_id";
        var rows = await conn.QueryAsync<string>(sql);
        return Ok(rows);
    }
}
