"use server";

import { clients } from "@/lib/magi";
import { Client } from "@absmach/magistrala-sdk";
import { randomUUID } from "node:crypto";

export async function updateClient(formData: Client) {
  try {
    return await clients.UpdateClient(formData);
  } catch (error) {
    return true;
  }
}

//  get clients
export async function getClients(): Promise<Client[]> {
  try {
    const listClients = await clients.Clients({});
    return listClients.clients;
  } catch (error) {
    return [
      {
        id: "1",
        name: "Client A",
        tags: ["tag1", "tag2"],
        status: "enabled",
        credentials: {
          identity: "identity",
          secret: randomUUID(),
        },
      },
      {
        id: "2",
        name: "Client B",
        tags: ["tag3"],
        status: "disabled",
        credentials: {
          identity: "identity",
          secret: randomUUID(),
        },
      },
    ] satisfies Client[];
  }
}
