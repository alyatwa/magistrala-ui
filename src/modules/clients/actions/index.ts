"use server";

import { clients } from "@/lib/magi";
import { Client } from "@absmach/magistrala-sdk";

export async function updateClient(formData: Client) {
  try {
    return await clients.UpdateClient(formData);
  } catch (error) {
    return true;
  }
}
