import { getGroupsFlattened } from "../actions";
import { GroupsTable } from "../components/GroupsTable";

export default function GroupsPage() {
  const groups = getGroupsFlattened();
  return (
    <>
      <GroupsTable groups={groups} />
    </>
  );
}
