import { getClients } from "../actions";
import { ClientsTable } from "../components/ClientsTable";

export default function ClientsPage() {
  const clients = getClients();
  return (
    <>
      <ClientsTable clients={clients} />
    </>
  );
}
