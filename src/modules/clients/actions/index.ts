"use server";

import { clients } from "@/lib/magi";
import { Client } from "@absmach/magistrala-sdk";

export async function updateClient(formData: Client) {
  await clients.UpdateClient(formData);
}
