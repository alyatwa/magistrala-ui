"use server";

import { Group, Status } from "@absmach/magistrala-sdk";
import { groups } from "@/lib/magi";
import { randomUUID } from "node:crypto";
import { cache } from "react";

// Mock groups data - replace with actual SDK calls when available
const mockGroups: Group[] = [
  {
    id: randomUUID(),
    name: "North America",
    description: "North American region group",
    level: 0,
    path: "north_america",
    status: "enabled" as Status,
    created_at: new Date("2024-01-15T10:30:00Z"),
    metadata: { region: "north_america", timezone: "EST" },
    children: [
      {
        id: randomUUID(),
        name: "USA",
        description: "United States group",
        parent_id: randomUUID(),
        level: 1,
        path: "north_america.usa",
        status: "disabled" as Status,
        created_at: new Date("2024-01-15T10:35:00Z"),
        metadata: { country: "usa", currency: "USD" },
      },
      {
        id: randomUUID(),
        name: "Canada",
        description: "Canada group",
        parent_id: randomUUID(),
        level: 1,
        path: "north_america.canada",
        status: "disabled" as Status,
        created_at: new Date("2024-01-15T10:40:00Z"),
        metadata: { country: "canada", currency: "CAD" },
      },
    ],
  },
  {
    id: randomUUID(),
    name: "Europe",
    description: "European region group",
    level: 0,
    path: "europe",
    status: "disabled" as Status,
    created_at: new Date("2024-01-16T09:15:00Z"),
    metadata: { region: "europe", timezone: "CET" },
    children: [
      {
        id: randomUUID(),
        name: "Germany",
        description: "Germany group",
        parent_id: randomUUID(),
        level: 1,
        path: "europe.germany",
        status: "disabled" as Status,
        created_at: new Date("2024-01-16T09:20:00Z"),
        metadata: { country: "germany", currency: "EUR" },
      },
      {
        id: randomUUID(),
        name: "France",
        description: "France group",
        parent_id: randomUUID(),
        level: 1,
        path: "europe.france",
        status: "disabled" as Status,
        created_at: new Date("2024-01-16T09:25:00Z"),
        metadata: { country: "france", currency: "EUR" },
      },
    ],
  },
  {
    id: randomUUID(),
    name: "Asia Pacific",
    description: "Asia Pacific region group",
    level: 0,
    path: "asia_pacific",
    status: "disabled" as Status,
    created_at: new Date("2024-01-17T14:00:00Z"),
    metadata: { region: "asia_pacific", timezone: "JST" },
    children: [
      {
        id: randomUUID(),
        name: "Japan",
        description: "Japan group",
        parent_id: randomUUID(),
        level: 1,
        path: "asia_pacific.japan",
        status: "disabled" as Status,
        created_at: new Date("2024-01-17T14:05:00Z"),
        metadata: { country: "japan", currency: "JPY" },
      },
    ],
  },
];

export async function updateGroup(formData: Group): Promise<boolean> {
  try {
    await groups.UpdateGroup(formData);

    return true;
  } catch (error) {
    console.error("Error updating group:", error);
    return false;
  }
}

export async function createGroup(
  formData: Omit<Group, "id" | "created_at" | "updated_at">
): Promise<boolean> {
  try {
    await groups.CreateGroup(formData);

    return true;
  } catch (error) {
    console.error("Error creating group:", error);
    return false;
  }
}

export async function deleteGroup(groupId: string): Promise<boolean> {
  try {
    await groups.DeleteGroup(groupId);
    return true;
  } catch (error) {
    console.error("Error deleting group:", error);
    return false;
  }
}

export async function enableGroup(groupId: string): Promise<boolean> {
  try {
    // TODO: Replace with actual SDK call
    await groups.EnableGroup(groupId);
    return true;
  } catch (error) {
    console.error("Error enabling group:", error);
    return false;
  }
}

export async function disableGroup(groupId: string): Promise<boolean> {
  try {
    await groups.DisableGroup(groupId);
    return true;
  } catch (error) {
    console.error("Error disabling group:", error);
    return false;
  }
}

// Get all groups
export async function getGroups(): Promise<Group[]> {
  try {
    const listGroups = await groups.Groups({});
    return listGroups.groups;

    return mockGroups;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return mockGroups;
  }
}

// Get groups flattened (for table display)
export const getGroupsFlattened = cache(async (): Promise<Group[]> => {
  const groups = await getGroups();
  const flattened: Group[] = [];

  function flattenGroups(groupsList: Group[], level = 0) {
    groupsList.forEach((group) => {
      flattened.push({ ...group, level });
      if (group.children && group.children.length > 0) {
        flattenGroups(group.children, level + 1);
      }
    });
  }

  flattenGroups(groups);
  return flattened;
});

// Get parent groups for dropdown
export async function getParentGroups(): Promise<
  Array<{ id: string; name: string; path?: string }>
> {
  const groups = await getGroups();
  const parents: Array<{ id: string; name: string; path?: string }> = [];

  function extractParents(groupsList: Group[]) {
    groupsList.forEach((group) => {
      if (group.id && group.name) {
        parents.push({ id: group.id, name: group.name, path: group.path });
      }
      if (group.children && group.children.length > 0) {
        extractParents(group.children);
      }
    });
  }

  extractParents(groups);
  return parents;
}
