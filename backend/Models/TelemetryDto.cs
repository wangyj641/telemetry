using System.Text.Json.Serialization;

namespace TelemetryApi.Models;

public class TelemetryDto
{
    public string MachineId { get; set; } = default!;
    public DateTime Timestamp { get; set; }
    public double? GpsLat { get; set; }
    public double? GpsLon { get; set; }
    public double? SeedingDepth { get; set; }
    public double? Speed { get; set; }

    // Payload can contain arbitrary device data
    [JsonPropertyName("payload")]
    public object? Payload { get; set; }
}
