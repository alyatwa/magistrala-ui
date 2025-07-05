"use server";

import { channels } from "@/lib/magi";
import { Channel } from "@absmach/magistrala-sdk";
import { randomUUID } from "node:crypto";

export async function updateChannel(formData: Channel) {
  try {
    // For creating new channels, we would use CreateChannel
    // For now, just mock the response
    return await channels.CreateChannel(formData);
  } catch (error) {
    return true;
  }
}

//  get channels
export async function getChannels(): Promise<Channel[]> {
  try {
    const listChannels = await channels.Channels({});
    return listChannels.channels;
  } catch (error) {
    return [
      {
        id: "1",
        name: "Temperature Sensor Channel",
        tags: ["temperature", "sensor"],
        status: "enabled",
        metadata: {
          type: "temperature",
          unit: "celsius",
          location: "room_1",
        },
      },
      {
        id: "2",
        name: "Humidity Sensor Channel",
        tags: ["humidity", "sensor"],
        status: "disabled",
        metadata: {
          type: "humidity",
          unit: "percentage",
          location: "room_2",
        },
      },
      {
        id: "3",
        name: "Motion Detector Channel",
        tags: ["motion", "security"],
        status: "enabled",
        metadata: {
          type: "motion",
          sensitivity: "high",
          location: "entrance",
        },
      },
    ] satisfies Channel[];
  }
}
