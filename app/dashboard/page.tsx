import Link from "next/link";

function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl">DashboardPage</h1>
      <Link href="/dashboard/transactions/new">New Transactions</Link>
    </div>
  );
}
export default DashboardPage;
