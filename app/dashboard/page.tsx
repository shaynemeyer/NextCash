import CashFlow from "@/components/Transaction/CashFlow";
import RecentTransactions from "@/components/Transaction/RecentTransactions";

function DashboardPage() {
  return (
    <div className="max-w-screen-xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      <CashFlow />
      <RecentTransactions />
    </div>
  );
}
export default DashboardPage;
