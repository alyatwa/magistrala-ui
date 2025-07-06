import { getRoles } from "../actions";
import { RolesTable } from "../components/RolesTable";

export default function RolesPage() {
  const roles = getRoles();
  return (
    <>
      <RolesTable roles={roles} />
    </>
  );
}
