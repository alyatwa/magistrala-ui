"use server";

import { invitations } from "@/lib/magi";
import { type Invitation } from "@absmach/magistrala-sdk";
import { randomUUID } from "node:crypto";


const invitationsMock =[
 {
   invited_by: randomUUID(),
   invitee_user_id: randomUUID(),
   domain_id: randomUUID(),
   domain_name: "Development Domain",
   role_name: "member",
   actions: ["read", "write"],
   created_at: new Date("2024-01-15T10:30:00Z"),
   updated_at: new Date("2024-01-15T10:30:00Z"),
   confirmed_at: undefined,
   rejected_at: undefined,
 },
 {
   invited_by: randomUUID(),
   invitee_user_id: randomUUID(),
   domain_id: randomUUID(),
   domain_name: "Production Domain",
   role_name: "admin",
   actions: ["read", "write", "delete", "admin"],
   created_at: new Date("2024-01-16T09:15:00Z"),
   updated_at: new Date("2024-01-16T09:15:00Z"),
   confirmed_at: new Date("2024-01-16T10:15:00Z"),
   rejected_at: undefined,
 },
 {
   invited_by: randomUUID(),
   invitee_user_id: randomUUID(),
   domain_id: randomUUID(),
   domain_name: "Testing Domain",
   role_name: "viewer",
   actions: ["read"],
   created_at: new Date("2024-01-17T14:20:00Z"),
   updated_at: new Date("2024-01-17T14:20:00Z"),
   confirmed_at: undefined,
   rejected_at: new Date("2024-01-17T15:20:00Z"),
 },
] satisfies Invitation[];

export async function createInvitation(
  formData: Omit<Invitation, "created_at" | "updated_at">
) {
  try {
    return await invitations.SendInvitation(
      formData.invitee_user_id as string,
      formData.role_id as string
    );
  } catch (error) {
    console.error("Error creating invitation:", error);
    return true;
  }
}

export async function deleteInvitation(inviteeUserId: string) {
  try {
    // TODO: Replace with actual SDK call when available
    return await invitations.DeleteInvitation(inviteeUserId);
  } catch (error) {
    console.error("Error deleting invitation:", error);
    return true;
  }
}

// Get invitations
export async function getInvitations(): Promise<Invitation[]> {
  try {

    // const listInvitations = await invitations.ListDomainInvitations({});
    // return listInvitations.invitations;
    return invitationsMock
  } catch (error) {
    console.error("Error fetching invitations:", error);
    // Mock data for now
    return invitationsMock
  }
}

export async function confirmInvitation() {
  try {
    return await invitations.AcceptInvitation();
  } catch (error) {
    console.error("Error confirming invitation:", error);
    return true;
  }
}

export async function rejectInvitation() {
  try {
    return await invitations.RejectInvitation();
  } catch (error) {
    console.error("Error rejecting invitation:", error);
    return true;
  }
}
