import ClientForm from "../components/ClientForm";

export default function ClientsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Clients Page</h1>
      <p className="text-lg">This is the Clients page content.</p>
      <ClientForm />
    </div>
  );
}
