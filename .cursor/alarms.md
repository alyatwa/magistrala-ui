---
title: Alarms
---

## Overview

The Alarms service allows users to create alarms triggered by threshold conditions defined in the Rules Engine. When a rule is triggered, the system generates an alarm with relevant information.

The returned alarm object includes the following fields:

| Option            | Description                                               | Required             |
| ----------------- | --------------------------------------------------------- | -------------------- |
| `id`              | Unique identifier of the alarm                            | ❌                   |
| `rule_id`         | ID of the rule that triggered the alarm                   | ✅ (added by system) |
| `domain_id`       | ID of the domain this alarm belongs to                    | ✅ (added by system) |
| `channel_id`      | ID of the channel related to the alarm                    | ✅ (added by system) |
| `client_id`       | ID of the client associated with the alarm                | ✅ (added by system) |
| `subtopic`        | Subtopic of the message that triggered the alarm          | ❌                   |
| `status`          | Current status of the alarm (e.g., active, cleared)       | ❌                   |
| `measurement`     | Name of the measurement involved in the alarm condition   | ✅                   |
| `value`           | Value that triggered the alarm                            | ✅                   |
| `unit`            | Unit of the measurement value                             | ❌                   |
| `threshold`       | Threshold value set in the rule that triggered the alarm  | ✅                   |
| `cause`           | Explanation of why the alarm was triggered                | ✅                   |
| `severity`        | Severity level of the alarm (e.g., 1 = low, 5 = critical) | ✅                   |
| `assignee_id`     | ID of the user assigned to resolve the alarm              | ❌                   |
| `created_at`      | Timestamp when the alarm was created                      | ❌                   |
| `updated_at`      | Timestamp when the alarm was last updated                 | ❌                   |
| `updated_by`      | ID of the user who last updated the alarm                 | ❌                   |
| `assigned_at`     | Timestamp when the alarm was assigned                     | ❌                   |
| `assigned_by`     | ID of the user who assigned the alarm                     | ❌                   |
| `acknowledged_at` | Timestamp when the alarm was acknowledged                 | ❌                   |
| `acknowledged_by` | ID of the user who acknowledged the alarm                 | ❌                   |
| `resolved_at`     | Timestamp when the alarm was resolved                     | ❌                   |
| `resolved_by`     | ID of the user who resolved the alarm                     | ❌                   |
| `metadata`        | Additional metadata related to the alarm                  | ❌                   |

## Use Cases

Here are some example scenarios where alarms are useful in IoT systems:

- **Temperature Monitoring**: Raise an alarm when a temperature sensor reports values above or below safe thresholds in environments like server rooms, greenhouses, or refrigerators.
- **Power Consumption Alerts**: Trigger alarms if energy usage exceeds defined limits, helping to prevent overload or equipment damage.
- **Air Quality Monitoring**: Detect hazardous gas levels (e.g., CO₂, smoke) in smart buildings and alert relevant personnel.
- **Water Leak Detection**: Set alarms when water sensors detect unexpected moisture levels in industrial facilities or homes.
- **Machine Failure Prediction**: Generate alarms based on vibration or noise thresholds from industrial machines, allowing preventive maintenance.
- **Security Events**: Detect unauthorized access attempts or motion in restricted areas using motion sensors or door sensors.
 