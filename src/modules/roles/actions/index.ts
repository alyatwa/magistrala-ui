"use server";

import { domainId, mgSdk, token } from "@/lib/magi";
import { Role } from "@absmach/magistrala-sdk";

export async function updateRole(formData: Role) {
  try {
    const { id, ...data } = formData;
    const updatedRole = await mgSdk.Domains.UpdateDomainRole(
      domainId,
      id!,
      data,
      token
    );
    return updatedRole;
  } catch (error) {
    return true;
  }
}

//  get roles
export async function getRoles(): Promise<Role[]> {
  try {
    const listRoles = await mgSdk.Domains.ListDomainRoles(domainId, {}, token);
    return listRoles.roles;
  } catch (error) {
    return [
      {
        id: "1",
        name: "Admin",
        entity_id: "domain1",
        created_by: "user1",
        created_at: new Date(),
        updated_at: new Date(),
        updated_by: "user1",
      },
      {
        id: "2",
        name: "Editor",
        entity_id: "domain1",
        created_by: "user2",
        created_at: new Date(),
        updated_at: new Date(),
        updated_by: "user2",
      },
      {
        id: "3",
        name: "Viewer",
        entity_id: "domain1",
        created_by: "user3",
        created_at: new Date(),
        updated_at: new Date(),
        updated_by: "user3",
      },
    ] satisfies Role[];
  }
}
