import GroupForm from "../components/GroupForm";

export default function GroupsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Groups Page</h1>
      <p className="text-lg">This is the Groups page content.</p>
      <GroupForm />
    </div>
  );
}
