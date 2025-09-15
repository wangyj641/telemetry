CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- 如果需要 gen_random_uuid()
CREATE TABLE IF NOT EXISTS telemetry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id varchar(64) NOT NULL,
  timestamp timestamptz NOT NULL,
  gps_lat double precision,
  gps_lon double precision,
  seeding_depth double precision,
  speed double precision,
  payload jsonb,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS telemetry_machine_time_idx ON telemetry (machine_id, timestamp DESC);
