"use server";

import { alarms } from "@/lib/magi";
import { Alarm, AlarmStatus } from "@absmach/magistrala-sdk";
import { randomUUID } from "node:crypto";

export async function updateAlarm(formData: Alarm) {
  try {
    // Mock successful update for now since SDK methods need proper investigation
    console.log("Mock alarm update:", formData);
    return true;
  } catch (error) {
    return true;
  }
}

// get alarms
export async function getAlarms(): Promise<Alarm[]> {
  try {
    // Mock successful list for now since SDK methods need proper investigation
    console.log("Mock alarm list call");
    return mockAlarms;
  } catch (error) {
    return mockAlarms;
  }
}

const mockAlarms: Alarm[] = [
  {
    id: "alarm-1",
    rule_id: "rule-001",
    domain_id: "domain-001",
    channel_id: "channel-001",
    client_id: "client-001",
    subtopic: "sensors/temperature",
    status: "active" as AlarmStatus,
    measurement: "temperature",
    value: "85.5",
    unit: "°C",
    threshold: "80.0",
    cause: "Temperature exceeded maximum threshold",
    severity: 4,
    assignee_id: "user-001",
    created_at: new Date(),
    updated_at: new Date(),
    metadata: {
      location: "Server Room A",
      sensor_type: "DHT22",
    },
  },
  {
    id: "alarm-2",
    rule_id: "rule-002",
    domain_id: "domain-001",
    channel_id: "channel-002",
    client_id: "client-002",
    subtopic: "sensors/humidity",
    status: "cleared" as AlarmStatus,
    measurement: "humidity",
    value: "15.2",
    unit: "%",
    threshold: "20.0",
    cause: "Humidity below minimum threshold",
    severity: 2,
    assignee_id: "user-002",
    created_at: new Date(Date.now() - 86400000),
    updated_at: new Date(),
    acknowledged_at: new Date(),
    acknowledged_by: "user-002",
    metadata: {
      location: "Greenhouse B",
      sensor_type: "SHT30",
    },
  },
  {
    id: "alarm-3",
    rule_id: "rule-003",
    domain_id: "domain-001",
    channel_id: "channel-003",
    client_id: "client-003",
    subtopic: "sensors/pressure",
    status: "cleared" as AlarmStatus,
    measurement: "pressure",
    value: "950.5",
    unit: "hPa",
    threshold: "1000.0",
    cause: "Pressure below critical threshold",
    severity: 5,
    assignee_id: "user-001",
    created_at: new Date(Date.now() - 172800000),
    updated_at: new Date(),
    resolved_at: new Date(),
    resolved_by: "user-001",
    metadata: {
      location: "Production Line 1",
      equipment: "Compressor Unit A",
    },
  },
] satisfies Alarm[];
