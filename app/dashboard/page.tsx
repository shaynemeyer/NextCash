import CashFlow from "@/components/Cashflow/CashFlow";
import RecentTransactions from "@/components/Transaction/RecentTransactions";

async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ cfyear: string }>;
}) {
  const today = new Date();
  const searchParamsValues = await searchParams;

  let cfYear = Number(searchParamsValues.cfyear ?? today.getFullYear());

  if (isNaN(cfYear)) {
    cfYear = today.getFullYear();
  }

  return (
    <div className="max-w-screen-xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      <CashFlow year={cfYear} />
      <RecentTransactions />
    </div>
  );
}
export default DashboardPage;
