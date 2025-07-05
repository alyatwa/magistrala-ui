"use server";

import { users } from "@/lib/magi";
import { User } from "@absmach/magistrala-sdk";
import { randomUUID } from "node:crypto";

export async function updateUser(formData: Partial<User>) {
  try {
    await users.Update(formData);
    return true;
  } catch (error) {
    return true;
  }
}

//  get users
export async function getUsers(): Promise<User[]> {
  try {
    // For demo purposes, return mock data
    const listUsers = await users.Users({});
    return listUsers.users;
  } catch (error) {
    return [
      {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        tags: ["admin", "manager"],
        status: "enabled",
        credentials: {
          secret: randomUUID(),
        },
      },
      {
        id: "2",
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        tags: ["user"],
        status: "disabled",
        credentials: {
          secret: randomUUID(),
        },
      },
    ] satisfies User[];
  }
}
