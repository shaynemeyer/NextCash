import { getAnnualCachflow } from "@/app/actions/dashboard";

async function Cashflow() {
  const cashflow = await getAnnualCachflow(2025);

  return <div>Cashflow</div>;
}

export default Cashflow;
