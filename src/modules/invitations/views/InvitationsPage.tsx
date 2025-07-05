import { getInvitations } from "../actions";
import { InvitationsTable } from "../components/InvitationsTable";

export default function InvitationsPage() {
  const invitations = getInvitations();
  return (
    <>
      <InvitationsTable invitations={invitations} />
    </>
  );
}
