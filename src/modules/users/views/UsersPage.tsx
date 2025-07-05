import { getUsers } from "../actions";
import UsersTable from "../components/UsersTable";

export default function UsersPage() {
  const users = getUsers();
  return (
    <>
      <UsersTable users={users} />
    </>
  );
}
