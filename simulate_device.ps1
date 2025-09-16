$api = "http://localhost:5069/api/v1/telemetry"
$machines = @("M-1001","M-1002","M-1003", "M-1004","M-1005")
while ($true) {
  foreach ($m in $machines) {
    $lat = 49.5 + (Get-Random) * 1.0
    $lon = -105.0 + (Get-Random) * 1.0
    $depth = 3.5 + (Get-Random) * 1.5
    $speed = 4.0 + (Get-Random) * 4.0
    $timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    $payload = @{note="demo"; battery = (Get-Random -Minimum 40 -Maximum 100)}
    $body = @{
      machineId = $m
      timestamp = $timestamp
      gpsLat = [math]::Round($lat,6)
      gpsLon = [math]::Round($lon,6)
      seedingDepth = [math]::Round($depth,2)
      speed = [math]::Round($speed,2)
      payload = $payload
    } | ConvertTo-Json -Depth 5
    Invoke-RestMethod -Uri $api -Method Post -Body $body -ContentType "application/json" -ErrorAction SilentlyContinue
    Write-Output "Posted $m at $timestamp"
    Start-Sleep -Milliseconds 200
  }
  Start-Sleep -Seconds 2
}
